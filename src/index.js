import './css/style.css'
import $ from 'jquery';
import DrawDots from './draw_dots.js';
import DialogueAnimation from './dialogue_animation.js';
import * as DialogueDom from './dialogue_dom_ops';

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

  $(search_form).submit(function (event) {
    let input_text = $("input").val()
    if ('home' === input_text) {
      console.log(input_text);
    } else if ($("input").val() === "instagram") {
      
    } else if ($("input").val() === "ipconfig") {

    }

    let diag_elem = DialogueDom.append_dialogue(input_text);

    diag_anim.add_dialogue(diag_elem);
    event.preventDefault();
  });



})(window);
