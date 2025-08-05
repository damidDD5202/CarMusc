const images = {
    cleaning: '../../assets/icons/cleaning.svg',
    list: '../../assets/icons/list.svg',
    polishing: '../../assets/icons/polishing.svg',
    washing: '../../assets/icons/washing.svg',
}

const services = {
    ordered: [
        {
            image: images.washing,
            name: 'corrosion treatment',
            price: 15,
            description: 'we clean the surface, remove old coatings, and apply special anti-corrosion compounds',
        },
        {
            image: images.polishing,
            name: 'lamination of the body',
            price: 15,
            description: 'This service helps to preserve the original color and shine of the body, as well as makes car maintenance easier',
        },
        {
            image: images.cleaning,
            name: 'body painting',
            price: 20,
            description: 'Using only high-quality paints and modern technologies, we guarantee perfect coverage, resistance to fading, and durability',
        },
        {
            image: images.cleaning,
            name: 'painting parts',
            price: 12,
            description: 'It allows you to restore or change the color of individual elements of your car, such as bumpers, doors, or hoods',
        },
        {
            image: images.cleaning,
            name: 'painting discs',
            price: 41,
            description: 'We offer painting of both steel and alloy wheels using special paints that provide protection against corrosion and mechanical damage',
        },
        {
            image: images.list,
            name: 'protective varnish',
            price: 15,
            description: 'The protective varnish creates a strong barrier, protecting the car from chemicals and mechanical damage',
        }
    ],
    completed: [
        {
            image: images.polishing,
            name: 'headlight polishing',
            price: 15,
            description: 'special formulations and tools to restore the headlights to their original appearance, improving visibility on the road',
        },
        {
            image: images.polishing,
            name: 'body polishing',
            price: 15,
            description: 'We use high-quality polishing pastes and equipment to restore the car\'s charming shine and depth of color',
        },
        {
            image: images.cleaning,
            name: 'ceramic coating',
            price: 15,
            description: 'Applying a ceramic coating protects against chemicals and mechanical damage, and makes it easier to maintain your vehicle',
        },
        {
            image: images.list,
            name: 'interior dry cleaning',
            price: 15,
            description: 'The protective varnish creates a strong barrier, protecting the car from chemicals and mechanical damage',
        },
        {
            image: images.washing,
            name: 'dents removal',
            price: 15,
            description: 'Special technologies and tools for carefully removing dents, which allows you to preserve the original coating',
        },
        {
            image: images.washing,
            name: 'protective film',
            price: 15,
            description: 'The film forms a durable barrier that preserves the original color and shine of the body, making it easier to maintain the vehicle',
        }
    ]
}

const cards = {
    ordered: [],
    completed: []
}

const servicesBox = document.getElementsByClassName('services-box')[0];

const buttons = document.querySelectorAll('.services-filter button');
const filterBackground = document.querySelector('.filter-background');

let select = 'ordered';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        select = button.getAttribute('data-target');

        moveSelectButton();
    });
});

function moveSelectButton(){
    let newPositionLeft = 0;
    let newPositionTop = 0;

    let newWidth = select == 'ordered' ? 178 : 208;

    if(window.innerWidth < 469){
        newPositionLeft = select == 'ordered' ? 15 : 0;
        newPositionTop = select == 'ordered' ? 0 : 87;
    }else{
        newPositionLeft = select == 'ordered' ? 0 : 228;
    }

    filterBackground.style.left = `${newPositionLeft}px`;
    filterBackground.style.top = `${newPositionTop}px`;
    filterBackground.style.width = `${newWidth}px`;

    addOrShowCards();
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize',  function(){
        moveSelectButton();
    });
});



//  ---     container-card   ---//

let containerCard;

let filterValue = { value: null };;
let sortValue = { value: null };;

function createCard(service){
    const container = document.createElement('div');
    container.className = 'container-service';

    const icon = document.createElement('img');
    icon.src = service.image;

    const name = document.createElement('p');
    name.className = 'text-demi-24-l5 name-service';
    name.textContent = service.name

    const price = document.createElement('p');
    price.className = 'text-demi-24-l5 price';
    price.textContent = `~${service.price}$`

    const buttonOrder = document.createElement('button');
    buttonOrder.className = 'half';

    const textButton = document.createElement('p');
    textButton.className = 'text-medium-30-l5';
    textButton.textContent = 'Refuse';

    const span = document.createElement('span');
    const description = document.createElement('p');
    description.className = 'text-demi-s16-h24-l5 description';
    description.textContent = service.description;

    // append

    buttonOrder.appendChild(textButton);
    buttonOrder.appendChild(span);

    container.appendChild(icon);
    container.appendChild(name);
    container.appendChild(price);
    container.appendChild(buttonOrder);
    container.appendChild(description);

    container.addEventListener('click', function() {
        if (containerCard) {
            if (containerCard == container) {
                containerCard.classList.remove('active');
                containerCard = null; 
            } else {
                containerCard.classList.remove('active');
                containerCard = container; 
            }
        } else {
            containerCard = container;
        }

        container.classList.toggle('active');
    });

    return container;
}

function addOrShowCards() {
    servicesBox.innerHTML = '';

    if (cards[select].length === 0) {
        for (let i = 0; i < services[select].length; i++) {
            cards[select].push(createCard(services[select][i]));
        }
    }

    let filteredCards = cards[select].filter(card => {
        if (!filterValue.value && !inputField.value) return true; 

        const service = services[select][cards[select].indexOf(card)];
        const matchesFilter = filterValue.value ? getKeyByValue(images, service.image) === filterValue.value : true;
        const matchesSearch = service.name.toLowerCase().includes(inputField.value.toLowerCase()); 

        return matchesFilter && matchesSearch; 
    });

    if (sortValue.value) {
        filteredCards.sort((a, b) => {
            const serviceA = services[select][cards[select].indexOf(a)];
            const serviceB = services[select][cards[select].indexOf(b)];

            switch (sortValue.value) {
                case 'name A - Z':
                    return serviceA.name.localeCompare(serviceB.name);
                case 'name Z - A':
                    return serviceB.name.localeCompare(serviceA.name);
                case 'price 1 - 9':
                    return serviceA.price - serviceB.price;
                case 'price 9 - 1':
                    return serviceB.price - serviceA.price;
                default:
                    return 0;
            }
        });
    }

    if (filteredCards.length === 0) {
        const noServicesMessage = document.createElement('p');
        noServicesMessage.className = 'text-demi-32-l5 no-services-message';
        noServicesMessage.textContent = 'No services available at the moment.';
        servicesBox.appendChild(noServicesMessage);
    } else {
        filteredCards.forEach(card => {
            servicesBox.appendChild(card);
        });
    }
}

// Функция для получения ключа по значению
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// ---      seacr       ---//


const customInput = document.querySelector('.custom-input');
const inputField = customInput.querySelector('input');
const clearButton = customInput.querySelector('#clear-button');

customInput.addEventListener('click', function() {
    inputField.focus();
    customInput.classList.add('active');
});

inputField.addEventListener('blur', function(){
    customInput.classList.remove('active');
})

inputField.addEventListener('input', function() {
    addOrShowCards();
});

clearButton.addEventListener('click', function(event){
    event.stopPropagation();
    inputField.value = ''; 
    inputField.focus(); 
    customInput.classList.add('active');
    addOrShowCards();
});

addOrShowCards();


// ---      select      ---//


const filterOption = Object.keys(images);
const sortOption = ['name A - Z', 'name Z - A', 'price 1 - 9', 'price 9 - 1'];

const filter = document.querySelector('#filter');
const sort = document.querySelector('#sort');

document.addEventListener('DOMContentLoaded', function () {
    addOption(filter, filterOption, filterValue, 'filter');
    addOption(sort, sortOption, sortValue, 'sort');
});

function addOption(selectBox, option, value, defaultText){
    const optionBox = selectBox.getElementsByClassName('select-option')[0];
    const selectOption = selectBox.getElementsByClassName('option-select')[0];

    for(let i = 0; i < option.length; i++){
        let tempOption = document.createElement('p');
        tempOption.className = 'text-demi-s20-h30-l5 option';
        tempOption.textContent = option[i];

        tempOption.addEventListener('click', function(){
            if(value.value == option[i]){
                value.value = null;
                selectOption.textContent = defaultText;
            }else{
                value.value = option[i];
                selectOption.textContent = value.value;
            }

            addOrShowCards();
        })

        optionBox.appendChild(tempOption);
    }
}