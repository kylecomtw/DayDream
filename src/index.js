import './css/style.css'
import $ from 'jquery';
import DrawDots from './draw_dots.js';
import DialogueAnimation from './dialogue_animation.js';

DrawDots.init();
console.log(DrawDots.init);

$(function(){
  let diag_anim = new DialogueAnimation();
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

    var binder = $('input').val();
    var terminal_div = document.getElementsByClassName('terminal');
    $('.terminal').addClass("binding");

    var commands = document.createElement('p');
    commands.innerHTML = ('Execute: ' + binder);
    commands.setAttribute('class', 'terminal__line');
    $(commands).appendTo(terminal_div);





    event.preventDefault();
  });



})(window);
