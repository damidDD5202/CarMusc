const gallery = [
    {
        image: './assets/images/gc1.svg',
        text: 'Look at this amazing tandem! Bright colors and stylish rims make these cars True parking',
    },
    {
        image: './assets/images/gc2.svg',
        text: 'Our detailing services will give your car a new look, emphasizing its style and individuality',
    },
    {
        image: './assets/images/gc3.svg',
        text: 'This style not only attracts attention, but also emphasizes the owner\'s individualit.',
    },
    {
        image: './assets/images/gc4.svg',
        text: 'high-quality paintwork and details give it an aggressive and dynamic appearance',
    },
    {
        image: './assets/images/gc5.svg',
        text: 'At night, our lighting solutions emphasize its lines and powerful character',
    },
    {
        image: './assets/images/gc6.svg',
        text: 'Every detail of the car shines, because we take care of the car so that it looks great!',
    },
]

const cards = [];
let number = [0,1];

const sectionGallery = document.getElementsByClassName('gallery')[0];
const slide = sectionGallery.getElementsByClassName('slider');

slide[0].addEventListener('click', setLeft);
slide[1].addEventListener('click', setRight);

function createCard(content){
    const card = document.createElement('div');
    card.className = 'gallery-container-card'

    const img = document.createElement('img');
    img.src = content.image;

    const bc = document.createElement('div');
    bc.className = 'bcground';

    const description = document.createElement('p');
    description.className = 'text-demi-s18-h25-l5';
    description.textContent = content.text;

    card.appendChild(img);
    card.appendChild(bc);
    card.appendChild(description);

    return card;
}

function fillCards(){
    for(let i = 0; i < gallery.length; i++){
        cards.push(createCard(gallery[i]));
    }
}

function setLeft(){
    number[0] = (number[0] - 1 + 6) % 6;
    number[1] = (number[1] - 1 + 6) % 6;
    adjustLayout();
}

function setRight(){
    number[0] = (number[0] + 1) % 6;
    number[1] = (number[1] + 1) % 6;
    adjustLayout();
}

function addCards(value){
    const box = document.getElementsByClassName('gallery-container')[0];
    box.innerHTML = '';

    box.appendChild(cards[number[0]]);
    value && box.appendChild(cards[number[1]]);
}

function addOneCard(index){
    const box = document.getElementsByClassName('gallery-container')[0];
    box.innerHTML = '';
                    
    box.appendChild(cards[index]);
}

function setActive(event) {
    const boxGallery = document.getElementsByClassName('gallery')[0];
    const pagItems = boxGallery.getElementsByClassName('paggination-item');

    for (let item of pagItems) {
        item.classList.remove('active');
    }

    event.currentTarget.classList.add('active');

    const index = Array.from(pagItems).indexOf(event.currentTarget);

    addOneCard(index);
}

function addPaggination(){  
    const boxGallery = document.getElementsByClassName('gallery')[0];
    const paggination = document.createElement('div');
    paggination.className = 'paggination';
    boxGallery.appendChild(paggination);  
    
    for(let i = 0; i < gallery.length; i++){
        let pagItem = document.createElement('div');
        pagItem.className = 'paggination-item';
        pagItem.addEventListener('click', setActive)
        paggination.appendChild(pagItem);
    }

    if (paggination.firstChild) {
        paggination.firstChild.classList.add('active');
    }
}

function adjustLayout() {
    const boxGallery = document.getElementsByClassName('gallery')[0];
    const paggination = boxGallery.getElementsByClassName('paggination')[0];
    if (paggination) {
        paggination.remove(); 
    }

    if (window.innerWidth < 783) {
        addCards(false);
        addPaggination();        
    } else {
        addCards(true);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fillCards();
    adjustLayout();

    window.addEventListener('resize', adjustLayout);
});