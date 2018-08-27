import $ from 'jquery';

export function append_dialogue(dialog_text, options){
  let terminal_div = $('.terminal')[0];
  // $('.terminal').addClass("binding");

  let command = $('<p>' + dialog_text + '</p>')
                  .addClass('terminal__line');
  
  command.appendTo(terminal_div);
  
  return command[0];
}