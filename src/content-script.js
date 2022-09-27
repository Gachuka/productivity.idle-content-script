import axios from 'axios'

// const API_URL = "https://productivity-idle-server.herokuapp.com/"
const API_URL = "http://localhost:7878"

const notLogged = ["Space", "Enter", "Backspace", "Control", "Alt", "Shift", "Tab", "Meta", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft", "NumLock", "CapsLock", "Escape", "MediaTrackNext", "MediaTrackPrevious", "MediaStop", "MediaPlayPause","AudioVolumeMute", "AudioVolumeDown", "AudioVolumeUp", "LaunchApplication2", "Delete", "Insert", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "PageDown", "PageUp", "Home", "End"]
const randomInput = ["a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I","j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w","W","x","X","y","Y","z","Z",0,1,2,3,4,5,6,7,8,9,"!","@","#","$","%","^","&","*","(",")","-","_","+","=","|","\\","{","}","[","]",`'`,`"`,"`","~",":",";","<",">",",",".","?","/"]
const timerInterval = 5000
let saveData = []
let botTimer

// ACTION ON EVERY KEY PRESS
const downHandler = (event) => {

  if (notLogged.some(string => event.key === string)) {
    console.log("Not Logged");
    return;
  };

  console.log(event.key)
  const typedAdded = localStorage.getItem('typed_string') + event.key
  const typedThisSave = localStorage.getItem('typed_string_this_save') + event.key
  const countAdded = Number(localStorage.getItem('character_count')) + Number(localStorage.getItem('add_per_input'))
  const countThisSave = Number(localStorage.getItem('character_count_this_save')) + Number(localStorage.getItem('add_per_input'))
  const countLeftAdded = Number(localStorage.getItem('character_left')) + Number(localStorage.getItem('add_per_input'))
  
  localStorage.setItem('typed_string', typedAdded)
  localStorage.setItem('typed_string_this_save', typedThisSave)
  localStorage.setItem('character_count', countAdded)
  localStorage.setItem('character_count_this_save', countThisSave)
  localStorage.setItem('character_left', countLeftAdded)

}

// FUNCTION TO SET DATA
function setData() {
  axios.get(API_URL).then((response) => {
    console.log(response)
    saveData = response.data

    localStorage.setItem('typed_string', response.data.text_typed)
    localStorage.setItem('typed_string_this_save', '')
    localStorage.setItem('character_count', response.data.character_count)
    localStorage.setItem('character_count_this_save', 0)
    localStorage.setItem('character_left', response.data.character_left)
    localStorage.setItem('add_per_input', response.data.add_per_input)

  }).catch((error) => {
    console.log(error)
  });
}

// SAVE FUNCTION
const savePeriod = () => {
  console.log('saved');
  axios.get(API_URL).then((response) => {
    const putBody = {
      text_typed: localStorage.getItem('typed_string_this_save'),
      character_count: response.data.character_count + Number(localStorage.getItem('character_count_this_save'))
    };
    return axios.put(API_URL, putBody);
  }).then((response) => {
    localStorage.setItem('character_count_this_save', 0);
    localStorage.setItem('typed_string_this_save', '');
    return axios.get(API_URL);
  }).catch((error) => {
    console.log(error);
  })
}

// BOT INPUT FUNCTION
const botPeriod = () => {
  const rdmInput = randomInput[Math.floor(Math.random()*randomInput.length)]
  console.log(rdmInput)
  inputHandler(rdmInput)
}

// DO CHECK IF THERE IS DATA AND TIMER NOT STARTED YET
if (localStorage.getItem('is_saving') === 'false' && saveData) {
  setInterval(savePeriod, timerInterval);
  localStorage.setItem('is_saving', true);
};

if (localStorage.getItem('bot_running') === 'false' && botTypes > 0) {
  botTimer = setInterval(botPeriod, (botTypes*5000))
  localStorage.setItem('bot_running', true)
}

// ON MOUNT
// ADD EVENTLISTENER FOR KEYPRESS
window.addEventListener('keydown', downHandler)
window.onfocus = setData
window.onblur = savePeriod
window.onunload = () => {
  localStorage.setItem('is_saving', false);
  localStorage.setItem('bot_running', false);
  clearInterval(botTimer)
};

// EXECUTE INITIAL FUNCTIONALITY
setData()