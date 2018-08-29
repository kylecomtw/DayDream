import $ from 'jquery';
let back_url = "http://lope.linguistics.ntu.edu.tw:9091/sketchpad/wander"
export function parseText(text, pre_resp_func, post_resp_func){
  pre_resp_func();
  console.log("parseText: " + text);
  $.ajax({
      type: "POST", 
      url: back_url, 
      data: JSON.stringify({"text": text}), 
      contentType: "application/json",
      success: function(dat, status, xhr){        
        console.log(dat);
        post_resp_func({responseText: dat["responseText"]});
        },
      dataType: "json"});   
}