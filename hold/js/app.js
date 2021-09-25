const synth = window.speechSynthesis;

const form = document.querySelector('form')
const inputText = document.querySelector('#text-input')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('.rate-value')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('.pitch-value')
const selectVoice = document.querySelector('#select-voice')
const button = document.querySelector('.btn')

let voiceList  = [];

const allVoices = () => {
  voiceList = synth.getVoices()
  
  voiceList.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name + '(' + voice.lang + ')';
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-lang', voice.name)
    selectVoice.appendChild(option)
  })
};

allVoices()
if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = allVoices;
} 

const speak = () => {
  if(synth.speaking){
    console.error('already speaking....')
    return;
  }
  if(inputText.value !== ''){
    const speakText = new SpeechSynthesisUtterance(inputText.value);

    speakText.onend = e =>{
      console.log('Done speaking...')
    } 
    speakText.onerror = e =>{
      console.error('something went wrong')
    }
    const selectedVoice = selectVoice.selectedOptions[0].getAttribute('data-name')
    voiceList.forEach(voice =>{
      if(voice.name === selectedVoice){
        speakText.voice = voice;
      }
    })
    speakText.rate = rate.value
    speakText.pitch = pitch.value

    synth.speak(speakText);
  }
}

form.addEventListener('submit', e =>{
  e.preventDefault()
  speak();
  textInput.blur();
})
rate.addEventListener('change', e => rateValue.textContent = rate.value)

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

selectVoice.addEventListener('change', e => speak())