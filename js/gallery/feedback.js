const feedbackData = [
    {
        name: 'egor astapenko',
        service: 'cleanning',
        description: 'we clean the surface, remove old and apply special anti-corrosion compounds coatings, and apply special anti-corrosion compounds',
    },
    {
        name: 'egor astapenko1',
        service: 'cleanning1',
        description: 'we clean the surface, remove old and apply special anti-corrosion compounds coatings, and apply special anti-corrosion compounds',
    },
    {
        name: 'egor astapenko2',
        service: 'cleanning2',
        description: 'we clean the surface, remove old and apply special anti-corrosion compounds coatings, and apply special anti-corrosion compounds',
    },
    {
        name: 'egor astapenko3',
        service: 'cleanning3',
        description: 'we clean the surface, remove old and apply special anti-corrosion compounds coatings, and apply special anti-corrosion compounds',
    },
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

    const service = document.createElement('p');
    service.className = 'text-medium-20';
    service.textContent = content.service;

    const description = document.createElement('p');
    description.className = 'text-demi-s14-h20-l5';
    description.textContent = content.description;

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

    for(let i = 0; i < countCard; i++){
        if(countCard == 3 && i == 1 || countCard == 2 && i == 1 || countCard == 1 && i == 0){
            let activeCard = cards[i];
            activeCard.className = 'feedbak-card active';
            feedbackContainer.appendChild(activeCard);
        }else{
            feedbackContainer.appendChild(cards[i]);
        }
    }
}

addOrShowCards();




