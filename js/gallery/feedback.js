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

    for(let i = 0; i < 3; i++){
        console.log(i)
        if(i == 1){
            let activeCard = cards[i];
            activeCard.className = 'feedbak-card active';
            feedbackContainer.appendChild(activeCard);
        }else{
            console.log(cards[i]);
            feedbackContainer.appendChild(cards[i]);
        }
    }
}

addOrShowCards();




