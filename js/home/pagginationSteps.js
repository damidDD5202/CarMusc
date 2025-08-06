import i18n from '../i18n.js';

const steps = [
    'We have won several regional competitions in childcare',
    'Our team has been certified by well-known brands',
    'We actively participate in international exhibitions',
    'Our works have been published in magazines and online platforms',
    'We have left over 1,000 satisfied customers',
    'Became the owners of the Russian Detailing Cup',
]

const pathToGrade = './assets/icons/grade.svg';

const cards = [];

function createCard(i){
    let container = document.createElement('div');
    container.className = 'container';
    
    let containerText = document.createElement('div');
    containerText.className = 'container-text';

    let grid, number, img;
    if(i != 6){
        grid = document.createElement('p');
        grid.className = 'text-demi-30-l5';
        grid.textContent = '#';

        number = document.createElement('p');
        number.className = 'text-demi-52-l5';
        number.textContent = i;

        containerText.appendChild(grid);
        containerText.appendChild(number);
    }else{
        img = document.createElement('img');
        img.src = pathToGrade;

        containerText.appendChild(img);
    }
    

    let description = document.createElement('p');
    description.className = 'text-demi-s16-h24-l5';
    description.textContent = steps[i - 1];
    description.setAttribute('data-i18n', `steps.step.${i}`);

    container.appendChild(containerText);
    container.appendChild(description);

    return container;
}

function createSteps(){
    for(let i = 1; i <= steps.length; i++){
        const container = createCard(i);

        cards.push(container); 
    }
}

function addSteps(){
    const boxSteps = document.getElementsByClassName('steps-box')[0];

    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    for(let i = 0; i < steps.length; i++){
        if(i % 2 != 0){
            div2.appendChild(cards[i]);
        }else{
            div1.appendChild(cards[i]);
        }
    }
  
    boxSteps.appendChild(div1);
    boxSteps.appendChild(div2); 
}

function setActive(event) {
    const boxSteps = document.getElementsByClassName('steps-box')[0];
    const pagItems = boxSteps.getElementsByClassName('paggination-item');

    for (let item of pagItems) {
        item.classList.remove('active');
    }

    event.currentTarget.classList.add('active');

    const index = Array.from(pagItems).indexOf(event.currentTarget);

    addOneStep(index);
}


function addPaggination(){  
    const boxSteps = document.getElementsByClassName('steps-box')[0];
    const paggination = document.createElement('div');
    paggination.className = 'paggination';
    boxSteps.appendChild(paggination);  
    
    for(let i = 0; i < steps.length; i++){
        let pagItem = document.createElement('div');
        pagItem.className = 'paggination-item';
        pagItem.addEventListener('click', setActive)
        paggination.appendChild(pagItem);
    }

    if (paggination.firstChild) {
        paggination.firstChild.classList.add('active');
    }
}

function addOneStep(index) {
    const boxSteps = document.getElementsByClassName('steps-box')[0];
    const div1 = document.createElement('div');

    const existingContainer = boxSteps.getElementsByClassName('container')[0];
    if (existingContainer) {
        existingContainer.remove(); 
    }
    
    const stepToShow = cards[index];
    div1.appendChild(stepToShow);
    boxSteps.appendChild(div1); 
}

function adjustLayout() {
    const boxSteps = document.getElementsByClassName('steps-box')[0];
    boxSteps.innerHTML = '';

    if (window.innerWidth < 660) {
        addOneStep(0);
        addPaggination();
    } else {
        addSteps();
    }

    i18n.translate();
}

document.addEventListener('DOMContentLoaded', function () {
    createSteps();
    adjustLayout();

    window.addEventListener('resize', adjustLayout);
});