
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

const createExpressionBox = ({img, text}) =>{
    const div = document.createElement('div');
    div.classList.add('expression-box');
    div.innerHTML = `
        <img src="${img}" alt="${text}">
        <p class="info">${text}</p>
    `;
    div.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        div.classList.add('active');

        setTimeout(() => {
            div.classList.remove('active');
        }, 1000);
    });

    main.appendChild(div);
};

humanExpressoins.forEach(createExpressionBox);

let voices = [];

speechSynthesis.addEventListener('voiceschanged', () =>{
    voices = speechSynthesis.getVoices();

    const googleVoice = voices.find(voice =>
        voice.name === 'Google português do Brasil');

    const microsoftVoice =  voices.find(voice =>
        voice.name === 'Microsoft Maria Desktop - Portugês(Brazil)');

    voices.forEach(({name, lang}) =>{
        const option = document.createElement('option');
        option.value = name;

        if (googleVoice && option.value === googleVoice.name) {
            utterence.voice = googleVoice;
            option.selected = true
        }else if(microsoftVoice && option.value === microsoftVoice.name){
            utterence.voice = microsoftVoice;
            option.selected = true
        }

        
        option.textContent = `${lang} | ${name}`;
        selectElement.appendChild(option);
    });
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