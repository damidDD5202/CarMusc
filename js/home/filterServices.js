const images = {
    cleaning: './assets/icons/cleaning.svg',
    list: './assets/icons/list.svg',
    polishing: './assets/icons/polishing.svg',
    washing: './assets/icons/washing.svg',
}

const services = {
    pasting: [
        {
            image: images.washing,
            name: 'corrosion treatment',
            description: 'we clean the surface, remove old coatings, and apply special anti-corrosion compounds',
        },
        {
            image: images.polishing,
            name: 'lamination of the body',
            description: 'This service helps to preserve the original color and shine of the body, as well as makes car maintenance easier',
        },
        {
            image: images.cleaning,
            name: 'body painting',
            description: 'Using only high-quality paints and modern technologies, we guarantee perfect coverage, resistance to fading, and durability',
        },
        {
            image: images.cleaning,
            name: 'painting parts',
            description: 'It allows you to restore or change the color of individual elements of your car, such as bumpers, doors, or hoods',
        },
        {
            image: images.cleaning,
            name: 'painting discs',
            description: 'We offer painting of both steel and alloy wheels using special paints that provide protection against corrosion and mechanical damage',
        },
        {
            image: images.list,
            name: 'protective varnish',
            description: 'The protective varnish creates a strong barrier, protecting the car from chemicals and mechanical damage',
        }
    ],
    detailing: [
        {
            image: images.polishing,
            name: 'headlight polishing',
            description: 'special formulations and tools to restore the headlights to their original appearance, improving visibility on the road',
        },
        {
            image: images.polishing,
            name: 'body polishing',
            description: 'We use high-quality polishing pastes and equipment to restore the car\'s charming shine and depth of color',
        },
        {
            image: images.cleaning,
            name: 'ceramic coating',
            description: 'Applying a ceramic coating protects against chemicals and mechanical damage, and makes it easier to maintain your vehicle',
        },
        {
            image: images.list,
            name: 'interior dry cleaning',
            description: 'The protective varnish creates a strong barrier, protecting the car from chemicals and mechanical damage',
        },
        {
            image: images.washing,
            name: 'dents removal',
            description: 'Special technologies and tools for carefully removing dents, which allows you to preserve the original coating',
        },
        {
            image: images.washing,
            name: 'protective film',
            description: 'The film forms a durable barrier that preserves the original color and shine of the body, making it easier to maintain the vehicle',
        }
    ]
}

const cards = {
    pasting: [],
    detailing: []
}

const servicesBox = document.getElementsByClassName('services-box')[0];
const serviceContainer = document.getElementsByClassName('services-container')[0];

const buttons = document.querySelectorAll('.services-filter button');
const filterBackground = document.querySelector('.filter-background');

const slide = servicesBox.getElementsByClassName('slider');

let select = 'pasting';
let countCard = 3;

slide[0].addEventListener('click', setLeft);
slide[1].addEventListener('click', setRight);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        select = button.getAttribute('data-target');

        moveSelectButton();
        addOrShowCards();
    });
});

function setLeft(){
    const last = cards[select].pop();
    cards[select].unshift(last);
    addOrShowCards();
}

function setRight(){
    const first = cards[select].shift();
    cards[select].push(first);
    addOrShowCards();
}

function moveSelectButton(){
    let newPositionLeft = 0;
    let newPositionTop = 0;

    let newWidth = select == 'pasting' ? 170 : 190;

    if(window.innerWidth < 443){
        newPositionLeft = select == 'pasting' ? 10 : 0;
        newPositionTop = select == 'pasting' ? 0 : 87;
    }else{
        newPositionLeft = select == 'pasting' ? 0 : 220;
    }

    filterBackground.style.left = `${newPositionLeft}px`;
    filterBackground.style.top = `${newPositionTop}px`;
    filterBackground.style.width = `${newWidth}px`;
}


document.addEventListener('DOMContentLoaded', function () {
    setCountCardBox();

    window.addEventListener('resize',  function(){
        moveSelectButton();
        setCountCardBox();
    });
});


function setCountCardBox(){
    const size = window.innerWidth;

    countCard = size > 1401 ? 3 : size > 1029 ? 2 : 1;

    addOrShowCards();
}


// --- card ---


function addOrShowCards(){
    serviceContainer.innerHTML = '';

    if(cards[select].length < services[select].length){
        for(let i = 0; i < services[select].length; i++){
            cards[select].push(createCard(services[select][i]));
        }
    }

    for(let i = 0; i < countCard; i++){
        serviceContainer.appendChild(cards[select][i]);
    }
}

function createCard(service){
    const container = document.createElement('div');
    container.className = 'sbc-container';

    const image = document.createElement('img');
    image.src = service.image;

    const name = document.createElement('p');
    name.className = 'text-demi-24-l5';
    name.textContent = service.name;

    const description = document.createElement('p');
    description.className = 'text-demi-s16-h24-l5'
    description.textContent = service.description;

    const button = document.createElement('a');

    container.appendChild(image);
    container.appendChild(name);
    container.appendChild(description);
    container.appendChild(button);

    return container;
}

addOrShowCards();