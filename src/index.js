import './css/style.css'
import $ from 'jquery';
import DrawDots from './draw_dots.js';
import DialogueAnimation from './dialogue_animation.js';
import * as DialogueDom from './dialogue_dom_ops';
import * as SpeechRecog from './speech_api.js';

DrawDots.init();
console.log(DrawDots.init);
let diag_anim = new DialogueAnimation();

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

  SpeechRecog.setOnFinalCallback(speech_final_handler);
  SpeechRecog.setOnInterimCallback(speech_interim_handler);
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
    }

    let diag_elem = DialogueDom.append_dialogue(input_text);

    diag_anim.add_dialogue(diag_elem);
    $("input").val("");
  });


})(window);
