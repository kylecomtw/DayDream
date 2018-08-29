import './css/style.css'
import $ from 'jquery';
import DrawDots from './draw_dots.js';
import DialogueAnimation from './dialogue_animation.js';
import * as DialogueDom from './dialogue_dom_ops';
import * as SpeechRecog from './speech_api.js';
import * as Parsing from './input_parsing.js';

DrawDots.init();
console.log(DrawDots.init);
let backbase_url = config_backend_url || 
              "https://lope.linguistics.ntu.edu.tw:9091/sketchpad/";
let diag_anim = new DialogueAnimation();
let synth = window.speechSynthesis;
let input_queue = [];
let is_job_running = false;
$(function(){  
  diag_anim.init();
});


function add_to_dialogue(text){
  for(let i=0; i < text.length; i+=30){    
    let diag_elem = DialogueDom.append_dialogue(text.slice(i, i+30));
    diag_anim.add_dialogue(diag_elem);
  }
}

(function(){
  $.ajax({
    method: "delete", 
    url: backbase_url + "/memory", 
    success: function(x){console.log(x);}});
  let req_timestamp = Date.now();
  let pre_resp = (x) =>{
    console.log("preresponse text");
  };

  let post_resp = (resp_obj) => {
    if(resp_obj.responseText){
      is_job_running = false;
      add_to_dialogue(resp_obj.responseText);
      input_queue.push(resp_obj.responseText);
    }
  }
  
  setInterval(function(){
    if (is_job_running){
      console.log("Parsing job is still running");
      return;
    }

    if(input_queue.length > 0){
      let input_text = input_queue.join(",");
      input_queue = [];
      is_job_running = true; 
      setTimeout(()=>{
        Parsing.parseText(input_text, pre_resp, post_resp);
      }, Math.max(0, 5000-(Date.now()-req_timestamp)))
    }
    
  }, 3000);
})();

(function (window) {
  
  
  var search_form = document.getElementsByClassName('search__form');
  console.log(search_form);
  
  function speech_final_handler(transcript){    
    $("input").val(transcript);
    $("input").submit();
  }
  
  function speech_interim_handler(transcript){
    $("input").val(transcript);    
  }

  function speech_end_handler(transcript){
    add_to_dialogue("--- Stop recognition ---");    
  }

  SpeechRecog.setOnFinalCallback(speech_final_handler);
  SpeechRecog.setOnInterimCallback(speech_interim_handler);
  SpeechRecog.setOnEndCallback(speech_end_handler);

  $(search_form).submit(function (event) {
    event.preventDefault();
    let input_text = $("input").val()
    if ('home' === input_text) {
      console.log(input_text);
    } else if ($("input").val() === "stop") {
      console.log("Stop recognition")
      SpeechRecog.stopRecognition();
    } else if ($("input").val() === "listen") {
      console.log("start recognition")
      SpeechRecog.startRecognition(event);
      let resp = "好的，開始吧！";
      SpeechRecog.speak(synth, resp, "zh-TW");
      add_to_dialogue(resp);      
    } else if ($("input").val() === "listen English") {
      console.log("start recognition")
      SpeechRecog.startRecognition(event, "en-US");
      let resp = "OK, go ahead";
      SpeechRecog.speak(synth, resp, "en-US");
      add_to_dialogue(resp)      
    } else if ($("input").val() === "clear") {
      $(".terminal__line").remove();
      input_queue = [];
      is_job_running = false;
    } else {           
      add_to_dialogue(input_text);
      input_queue.push(input_text);
    }
        
    $("input").val("");
  });


})(window);
