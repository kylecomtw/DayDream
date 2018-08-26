import {TweenMax, TimelineMax} from 'gsap/TweenMax';
import $ from 'jquery';

export default class DialogueAnimation{
  init(){
    let tl = new TimelineMax();
    let term_lines = $('.terminal__line');  
    for (let tline of term_lines){
      let n_char = this.get_chwidth(tline.textContent);
      let duration = n_char / 10;      
      tl.add(TweenMax.fromTo(tline, duration, 
          {width: 0, height: 0}, 
          {width: n_char + "ch", height: "1.5em"}));
    }      
  }

  get_chwidth(text){
    let zhchar = RegExp('[\u3400-\u9fff\uff00-\uffef]', "g");
    let counter = 0;
    var m;
        
    while((m=zhchar.exec(text)) !== null){      
      console.log(m);
      counter += 1;
      if (counter > 100){
        break;
      }
    }
    console.log("%s, zhchar: %d", text, counter);
    
    return text.length + counter*1.5;

  }
}