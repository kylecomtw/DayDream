import {TweenMax, TimelineMax} from 'gsap/TweenMax';
import $ from 'jquery';

export default class DialogueAnimation{
  constructor(){
    this.timeline = new TimelineMax();
  }

  init(){
    let term_lines = $('.terminal__line');  
    for (let tline of term_lines){
      this.add_dialogue(tline);
    }      
  }

  add_dialogue(dialogue_elem, options){

    let elem_tweens = this.create_dialogue_tween(dialogue_elem); 
    this.timeline.add(elem_tweens);
  }

  create_dialogue_tween(diag_elem){

    let n_char = this.get_chwidth(diag_elem.textContent);
    let duration = n_char / 40;
    let width_tween = TweenMax.fromTo(diag_elem, duration, 
        {width: 0}, {width: n_char + "ch", ease: Linear.easeNone});
    let height_tween = TweenMax.fromTo(diag_elem, 0.1, 
        {height: 0}, {height: "1.5em"});
    return [width_tween, height_tween]
  }


  get_chwidth(text){
    let zhchar = RegExp('[\u3400-\u9fff\uff00-\uffef]', "g");
    let counter = 0;
    var m;
        
    while((m=zhchar.exec(text)) !== null){      
      counter += 1;
      if (counter > 100){
        break;
      }
    }
    
    return text.length + counter*2;

  }
}