// source code from
// https://github.com/googlearchive/webplatform-samples/webspeechdemo.html

var langs =
  [['Afrikaans', ['af-ZA']],
  ['Bahasa Indonesia', ['id-ID']],
  ['Bahasa Melayu', ['ms-MY']],
  ['Català', ['ca-ES']],
  ['Čeština', ['cs-CZ']],
  ['Deutsch', ['de-DE']],
  ['English', ['en-AU', 'Australia'],
    ['en-CA', 'Canada'],
    ['en-IN', 'India'],
    ['en-NZ', 'New Zealand'],
    ['en-ZA', 'South Africa'],
    ['en-GB', 'United Kingdom'],
    ['en-US', 'United States']],
  ['Español', ['es-AR', 'Argentina'],
    ['es-BO', 'Bolivia'],
    ['es-CL', 'Chile'],
    ['es-CO', 'Colombia'],
    ['es-CR', 'Costa Rica'],
    ['es-EC', 'Ecuador'],
    ['es-SV', 'El Salvador'],
    ['es-ES', 'España'],
    ['es-US', 'Estados Unidos'],
    ['es-GT', 'Guatemala'],
    ['es-HN', 'Honduras'],
    ['es-MX', 'México'],
    ['es-NI', 'Nicaragua'],
    ['es-PA', 'Panamá'],
    ['es-PY', 'Paraguay'],
    ['es-PE', 'Perú'],
    ['es-PR', 'Puerto Rico'],
    ['es-DO', 'República Dominicana'],
    ['es-UY', 'Uruguay'],
    ['es-VE', 'Venezuela']],
  ['Euskara', ['eu-ES']],
  ['Français', ['fr-FR']],
  ['Galego', ['gl-ES']],
  ['Hrvatski', ['hr_HR']],
  ['IsiZulu', ['zu-ZA']],
  ['Íslenska', ['is-IS']],
  ['Italiano', ['it-IT', 'Italia'],
    ['it-CH', 'Svizzera']],
  ['Magyar', ['hu-HU']],
  ['Nederlands', ['nl-NL']],
  ['Norsk bokmål', ['nb-NO']],
  ['Polski', ['pl-PL']],
  ['Português', ['pt-BR', 'Brasil'],
    ['pt-PT', 'Portugal']],
  ['Română', ['ro-RO']],
  ['Slovenčina', ['sk-SK']],
  ['Suomi', ['fi-FI']],
  ['Svenska', ['sv-SE']],
  ['Türkçe', ['tr-TR']],
  ['български', ['bg-BG']],
  ['Pусский', ['ru-RU']],
  ['Српски', ['sr-RS']],
  ['한국어', ['ko-KR']],
  ['中文', ['cmn-Hans-CN', '普通话 (中国大陆)'],
    ['cmn-Hans-HK', '普通话 (香港)'],
    ['cmn-Hant-TW', '中文 (台灣)'],
    ['yue-Hant-HK', '粵語 (香港)']],
  ['日本語', ['ja-JP']],
  ['Lingua latīna', ['la']]];


showInfo('info_start');

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var on_final_callback = function(transcript){};
var on_interim_callback = function(transcript){};
if (!('webkitSpeechRecognition' in window)) {
  console.log("Cannot find webkitSpeechRecognition");
} else {  
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onstart = function () {
    recognizing = true;
    showInfo('info_speak_now');
    // start_img.src = 'mic-animate.gif';
  };
  recognition.onerror = function (event) {
    if (event.error == 'no-speech') {
      // start_img.src = 'mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      // start_img.src = 'mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };
  recognition.onend = function () {
    recognizing = false;
    if (ignore_onend) {
      return;
    }

    showInfo("info_recog_end");
    showInfo('');
    if (false && window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
  };
  recognition.onresult = function (event) {
    var interim_transcript = '';
    if (event.results.length == 0) {
      return;
    }

    let latestResult = event.results[event.results.length-1];    
    if (latestResult.isFinal) {      
      final_transcript = latestResult[0].transcript;
      on_final_callback(final_transcript);        
      console.log("final_script:" + final_transcript);
    } else {
      interim_transcript = latestResult[0].transcript;
      on_interim_callback(interim_transcript);
      console.log("interim_script:" + interim_transcript);
    }
               
  };
}

export function stopRecognition(){
  if (recognizing) {
    recognition.stop();
    return;
  }
}

export function startRecognition(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'cmn-Hant-TW';
  recognition.start();
  ignore_onend = false;  
  // start_img.src = 'mic-slash.gif';
  showInfo('info_allow');  
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  console.log(s);
}

export function setOnFinalCallback(func){
  on_final_callback = func;
}

export function setOnInterimCallback(func){
  on_interim_callback = func;
}
