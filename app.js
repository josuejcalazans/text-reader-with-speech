
const main = document.querySelector('main');
const buttonInsertText = document.querySelector('.btn-toggle');
const buttonReadText = document.querySelector('#read');
const divTextBox = document.querySelector('.text-box');
const closeDivTextBox = document.querySelector('.close');
const selectElement = document.querySelector('select');
const textAre = document.querySelector('textarea');

const humanExpressoins = [
    {img: './img/drink.jpg', text: 'Estou com sede'},
    {img: './img/food.jpg', text: 'Estou com fome'},
    {img: './img/tired.jpg', text: 'Estou cansado'},
    {img: './img/hurt.jpg', text: 'Estou machucado'},
    {img: './img/happy.jpg', text: 'Estou feliz'},
    {img: './img/angry.jpg', text: 'Estou com raiva'},
    {img: './img/sad.jpg', text: 'Estou triste'},
    {img: './img/scared.jpg', text: 'Estou assustado'},
    {img: './img/outside.jpg', text: 'Quero ir lá fora'},
    {img: './img/home.jpg', text: 'Quero ir para casa'},
    {img: './img/school.jpg', text: 'Quero ir para a escola'},
    {img: './img/grandma.jpg', text: 'Quero ver a vovó'},
];

const  utterence = new SpeechSynthesisUtterance();

const setTextMessage = text => {
    utterence.text = text;
};

const speakText = () => {
    speechSynthesis.speak(utterence)
};

const setVoice = event => {
    selectedVoice = voices.find(voice => voice.name === event.target.value);    
    utterence.voice = selectedVoice;
};

const addExpressionBoxesIntoDOM = () =>{
    main.innerHTML = humanExpressoins.map(({img, text}) => `
        <div class="expression-box" data-js="${text}">
            <img src="${img}" alt="${text}" data-js="${text}">
            <p class="info" data-js="${text}">${text}</p>
        </div>`
    ).join('');
};

addExpressionBoxesIntoDOM();

const setStyleOfClickedDiv = dataValue =>{
    const div = document.querySelector(`[data-js="${dataValue}"]`)
    div.classList.add('active');

    setTimeout(() => {
        div.classList.remove('active');
    }, 1000);
};

main.addEventListener('click', event => {
    const clickedElement = event.target;
    const clickedElementText = clickedElement.dataset.js;
    const clickedElementTextMustBeSpoken = ['img', 'p'].some(elementName =>
        clickedElement.tagName.toLowerCase() === elementName.toLowerCase());

    if (clickedElementTextMustBeSpoken) {
        setTextMessage(clickedElementText);
        speakText();
        setStyleOfClickedDiv(clickedElementText);
    }
});

const insertOptionsElementIntoDOM = voices => {

    selectElement.innerHTML = voices.reduce((accumulator, {name, lang}) => {
        accumulator += `<option value="${name}">${lang} | ${name}</option>`;
        return accumulator;
    }, '');
};
const setUtterenceVoice = voice => {
    utterence.voice = voice;
    const voiceOptionElement = selectElement
        .querySelector(`[value="${voice.name}"]`);
        voiceOptionElement.selected = true
};

const setPTBRVoices = voices => {
    const googleVoice = voices.find(voice =>
        voice.name === 'Google português do Brasil');

    const microsoftVoice =  voices.find(voice =>
        voice.name === 'Microsoft Maria Desktop - Portugês(Brazil)');

    if (googleVoice) {
        setUtterenceVoice(googleVoice);
    } else if(microsoftVoice){
        setUtterenceVoice(microsoftVoice);
    }
};

let voices = [];

speechSynthesis.addEventListener('voiceschanged', () =>{
    voices = speechSynthesis.getVoices();

    insertOptionsElementIntoDOM(voices);

    setPTBRVoices(voices);
    
});

buttonInsertText.addEventListener('click', () => {
    divTextBox.classList.add('show')
});

closeDivTextBox.addEventListener('click', () => {
    divTextBox.classList.remove('show');
});

selectElement.addEventListener('change', setVoice);

buttonReadText.addEventListener('click', () => {
    setTextMessage(textAre.value);
    speakText()
});