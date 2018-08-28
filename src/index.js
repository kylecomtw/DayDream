import './css/style.css'
import $ from 'jquery';
import DrawDots from './draw_dots.js';
import DialogueAnimation from './dialogue_animation.js';
import * as DialogueDom from './dialogue_dom_ops';
import * as SpeechRecog from './speech_api.js';

DrawDots.init();
console.log(DrawDots.init);
let diag_anim = new DialogueAnimation();
let synth = window.speechSynthesis;
$(function(){  
  diag_anim.init();
});

(function (window) {
  
  
  var search_form = document.getElementsByClassName('search__form');
  console.log(search_form);

  var navigationLink = $('.terminal__line a');
  
  function speech_final_handler(transcript){
    $("input").val(transcript);
    $("input").submit();
  }
  
  function speech_interim_handler(transcript){
    $("input").val(transcript);    
  }

  function speech_end_handler(transcript){
    $("input").val("--- Stop recognition ---");
    $("input").submit();
  }

  function add_to_dialogue(text){
    let diag_elem = DialogueDom.append_dialogue(text);
    diag_anim.add_dialogue(diag_elem);
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
    } else {
      add_to_dialogue(input_text);      
      
    }
        
    $("input").val("");
  });


})(window);
