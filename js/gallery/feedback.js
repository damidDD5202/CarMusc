import i18n from "../i18n.js";

const feedbackData = [
    {
        id: '1',
        name: 'Maria Ivanova',
        service: 'Corrosion Treatment',
        description: 'Excellent service! After the treatment, the body looks brand new, and I no longer worry about corrosion.',
    },
    {
        id: '2',
        name: 'Alexey Petrov',
        service: 'Body Lamination',
        description: 'Lamination really helped preserve the color and shine. I am very satisfied with the result!',
    },
    {
        id: '3',
        name: 'Olga Smirnova',
        service: 'Body Painting',
        description: 'The painting was done at the highest level! The color matches perfectly, and the coating is very durable.',
    },
    {
        id: '4',
        name: 'Dmitry Nikolaev',
        service: 'Part Painting',
        description: 'Restored the color of the bumpers, and now they look brand new. Highly recommend!',
    },
    {
        id: '5',
        name: 'Anna Petrova',
        service: 'Wheel Painting',
        description: 'The wheel painting was done professionally; now they are protected from corrosion and look stylish.',
    },
    {
        id: '6',
        name: 'Ivan Sidorov',
        service: 'Protective Varnish',
        description: 'The protective varnish really works! My car is now protected from chemicals and damage.',
    }
]



const feedback = document.getElementsByClassName('feedback')[0];
const feedbackContainer = feedback.getElementsByClassName('feedback-container')[0];

const slide = feedback.getElementsByClassName('slider');

slide[0].addEventListener('click', setLeft);
slide[1].addEventListener('click', setRight);

const cards = [];
const imagePerson = '../../assets/icons/person.svg';

let countCard = 3;

document.addEventListener('DOMContentLoaded', function () {
    setCountCardBox();

    if(window.innerWidth < 783) addPaggination();
    
    window.addEventListener('resize',  function(){
        setCountCardBox();

        if(window.innerWidth < 783) addPaggination();
    });
});

function addPaggination(){  
    const paggination = feedback.getElementsByClassName('paggination')[0];
    paggination.innerHTML = '';

    for(let i = 0; i < cards.length; i++){
        let pagItem = document.createElement('div');
        pagItem.className = 'paggination-item';
        pagItem.addEventListener('click', setActive)
        paggination.appendChild(pagItem);
    }

    if (paggination.firstChild) {
        paggination.firstChild.classList.add('active');
    }
}

function setActive(event){
    const pagItems = feedback.getElementsByClassName('paggination-item');

    for (let item of pagItems) {
        item.classList.remove('active');
    }

    event.currentTarget.classList.add('active');

    const index = Array.from(pagItems).indexOf(event.currentTarget);

    addOneCard(index);
}

function addOneCard(index){
    feedbackContainer.innerHTML = '';

    const activeCard = cards[index];
    activeCard.className = 'feedbak-card active';

    feedbackContainer.appendChild(activeCard);
}

function setCountCardBox(){
    const size = window.innerWidth;

    countCard = size > 1401 ? 3 : size > 1029 ? 2 : 1;

    addOrShowCards();
}

function setLeft(){
    cards[1].className = 'feedbak-card';

    const last = cards.pop();
    cards.unshift(last);
    addOrShowCards();
}

function setRight(){
    cards[1].className = 'feedbak-card';
    
    const first = cards.shift();
    cards.push(first);
    addOrShowCards();
}


function createCard(content){
    const container = document.createElement('div');
    container.className = 'feedbak-card';

    const borderIcon = document.createElement('div');
    borderIcon.className = 'feedback-card-person';

    const person = document.createElement('img');
    person.src = imagePerson;

    const name = document.createElement('p');
    name.className = 'text-demi-22-l5';
    name.textContent = content.name;
    name.setAttribute('data-i18n', `feedback.${content.id}.name`);

    const service = document.createElement('p');
    service.className = 'text-medium-20';
    service.textContent = content.service;
    service.setAttribute('data-i18n', `feedback.${content.id}.service`);

    const description = document.createElement('p');
    description.className = 'text-demi-s14-h20-l5';
    description.textContent = content.description;
    description.setAttribute('data-i18n', `feedback.${content.id}.description`);

    borderIcon.appendChild(person);
    container.appendChild(borderIcon);
    container.appendChild(name);
    container.appendChild(service);
    container.appendChild(description);

    return container;
}

function addOrShowCards(){
    feedbackContainer.innerHTML = '';

    if(cards.length == 0){
        for(let i = 0; i < feedbackData.length; i++){
            cards.push(createCard(feedbackData[i]));
        }
    }

    console.log(cards)


    for(let i = 0; i < countCard; i++){
        if(countCard == 3 && i == 1 || countCard == 2 && i == 1 || countCard == 1 && i == 0){
            let activeCard = cards[i];
            activeCard.className = 'feedbak-card active';
            feedbackContainer.appendChild(activeCard);
        }else{
            feedbackContainer.appendChild(cards[i]);
        }
    }
    
    i18n.translate();
}


// addOrShowCards();



