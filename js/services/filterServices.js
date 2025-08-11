import i18n from "../i18n.js";
import { addCartService, getCartUserFilter, getServices, updateServicePrice } from "../../server/api.js";
import { openModal } from "../modal.js";

const lang = localStorage.getItem('language') || 'en';
const user = JSON.parse(localStorage.getItem('user'));

const images = {
    cleaning: '../../assets/icons/cleaning.svg',
    list: '../../assets/icons/list.svg',
    polishing: '../../assets/icons/polishing.svg',
    washing: '../../assets/icons/washing.svg',
}

let servicesData = {
    pasting: [
        {
            id: 1,
            image: 'washing',
            name: 'corrosion treatment',
            price: 15,
            description: 'we clean the surface, remove old coatings, and apply special anti-corrosion compounds',
        },
        {
            id: 2,
            image: 'polishing',
            name: 'lamination of the body',
            price: 15,
            description: 'This service helps to preserve the original color and shine of the body, as well as makes car maintenance easier',
        },
        {
            id: 3,
            image: 'cleaning',
            name: 'body painting',
            price: 20,
            description: 'Using only high-quality paints and modern technologies, we guarantee perfect coverage, resistance to fading, and durability',
        },
        {
            id: 4,
            image: 'cleaning',
            name: 'painting parts',
            price: 12,
            description: 'It allows you to restore or change the color of individual elements of your car, such as bumpers, doors, or hoods',
        },
        {
            id: 5,
            image: 'cleaning',
            name: 'painting discs',
            price: 41,
            description: 'We offer painting of both steel and alloy wheels using special paints that provide protection against corrosion and mechanical damage',
        },
        {
            id: 6,
            image: 'list',
            name: 'protective varnish',
            price: 15,
            description: 'The protective varnish creates a strong barrier, protecting the car from chemicals and mechanical damage',
        }
    ],
    detailing: [
        {
            id: 7,
            image: 'polishing',
            name: 'headlight polishing',
            price: 15,
            description: 'special formulations and tools to restore the headlights to their original appearance, improving visibility on the road',
        },
        {
            id: 8,
            image: 'polishing',
            name: 'body polishing',
            price: 15,
            description: 'We use high-quality polishing pastes and equipment to restore the car\'s charming shine and depth of color',
        },
        {
            id: 9,
            image: 'cleaning',
            name: 'ceramic coating',
            price: 15,
            description: 'Applying a ceramic coating protects against chemicals and mechanical damage, and makes it easier to maintain your vehicle',
        },
        {
            id: 10,
            image: 'list',
            name: 'interior dry cleaning',
            price: 15,
            description: 'The protective varnish creates a strong barrier, protecting the car from chemicals and mechanical damage',
        },
        {
            id: 11,
            image: 'washing',
            name: 'dents removal',
            price: 15,
            description: 'Special technologies and tools for carefully removing dents, which allows you to preserve the original coating',
        },
        {
            id: 12,
            image: 'washing',
            name: 'protective film',
            price: 15,
            description: 'The film forms a durable barrier that preserves the original color and shine of the body, making it easier to maintain the vehicle',
        }
    ]
}

let services;

let cards = {
    pasting: [],
    detailing: []
}

document.addEventListener('DOMContentLoaded', async function(){
    await tryGetServices();
})

async function tryGetServices(){
    try{
        services = await getServices();
    }catch(error){
        services = servicesData;

        console.log('error',error);
    }

    addOrShowCards();
}

const servicesBox = document.getElementsByClassName('services-box')[0];

const buttons = document.querySelectorAll('.services-filter button');
const filterBackground = document.querySelector('.filter-background');

let select = 'pasting';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        select = button.getAttribute('data-target');

        moveSelectButton();
    });
});

changePositionAndSize();

function moveSelectButton(){
    changePositionAndSize();
    addOrShowCards();
}

function changePositionAndSize(){
    let newPositionLeft = 0;
    let newPositionTop = 0;
    let newWidth = 0;
    
    if(lang == 'en'){
        newWidth = select == 'pasting' ? 170 : 190;

        if(window.innerWidth < 443){
            newPositionLeft = select == 'pasting' ? 10 : 0;
            newPositionTop = select == 'pasting' ? 0 : 87;
        }else{
            newPositionLeft = select == 'pasting' ? 0 : 220;
        }
    }else{
        newWidth = select == 'pasting' ? 182 : 210;

        if(window.innerWidth < 443){
            newPositionLeft = select == 'pasting' ? 14 : 0;
            newPositionTop = select == 'pasting' ? 0 : 87;
        }else{
            newPositionLeft = select == 'pasting' ? 0 : 232;
        }
    }
    

    filterBackground.style.left = `${newPositionLeft}px`;
    filterBackground.style.top = `${newPositionTop}px`;
    filterBackground.style.width = `${newWidth}px`;
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('resize',  function(){
        moveSelectButton();
    });
});



function formatDate() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (0-11) и добавляем 1, затем ведущий ноль
    const year = date.getFullYear(); // Получаем год
    const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль

    return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматируем строку
}


//  ---     container-card   ---//

let containerCard;

let filterValue = { value: null };;
let sortValue = { value: null };;

function createCard(service, i){
    const container = document.createElement('div');
    container.className = 'container-service';

    const icon = document.createElement('img');
    icon.src = images[service.image];

    const name = document.createElement('p');
    name.className = 'text-demi-24-l5 name-service';
    name.textContent = service.name
    name.setAttribute('data-i18n-common', `services.${i}.name`);

    const price = document.createElement('p');
    price.className = 'text-demi-24-l5 price';
    price.textContent = `~${service.price}$`

    const buttonOrder = document.createElement('button');
    buttonOrder.className = 'half';

    const textButton = document.createElement('p');
    textButton.className = 'text-medium-30-l5';
    textButton.textContent = user?.role != 'admin' ? 'Order' : 'Change';
    textButton.setAttribute('data-i18n-common', user?.role != 'admin' ? 'services.textButtonOrder' : 'services.textButtonChange');

    const span = document.createElement('span');
    const description = document.createElement('p');
    description.className = 'text-demi-s16-h24-l5 description';
    description.textContent = service.description;
    description.setAttribute('data-i18n-common', `services.${i}.description`);


    // append

    buttonOrder.appendChild(textButton);
    buttonOrder.appendChild(span);

    container.appendChild(icon);
    container.appendChild(name);
    container.appendChild(price);
    container.appendChild(buttonOrder);
    container.appendChild(description);

    buttonOrder.addEventListener('click', async function(event) {
        event.stopPropagation();

        let cartUserOrdered = await getCartUserFilter(user?.id, 'ordered');

        const description = document.createElement('p');
        description.classList.add('text-demi-s20-l5');
        description.classList.add('desc');

        if(user){
            if(user.role != 'admin'){
                if (cartUserOrdered.some(order => order.id == service.id)) {
                    description.textContent = 'You have already added the service to your shopping cart!';
                    description.setAttribute('data-i18n-common', `modal.description.successAdd`);

                    openModal('Order services', 'title.orderServices', description, () =>{
                        console.log('Упс, бывает, что забыл о том, что уже добавил')
                    });
                } else {
                    description.textContent = 'Do you really want to order a service?';
                    description.setAttribute('data-i18n-common', `modal.description.wantOrder`);

                    openModal('Order services', 'title.orderServices', description, ()=> addCartService(user.id, 'ordered', {id: service.id, dateOrdered: formatDate(), oldPrice: service.price}));
                }
            }else{
                const inputPrice = document.createElement('input');
                inputPrice.placeholder = 'price';
                inputPrice.setAttribute('data-i18n-common', `modal.placeholder.price`);

                async function myUpdate(){
                    try{
                        updateServicePrice(service.id, inputPrice.value);
                        window.location.reload();
                    }catch(error){
                        console.log(error);
                    }
                }

                openModal('Change price', 'title.changePrice', inputPrice, () => myUpdate());
            }
        }else{
            description.textContent = 'To order a service, you must be logged in!\n\nprofile --> sign in\\up';
            description.setAttribute('data-i18n-common', `modal.description.needAuth`);

            openModal('Order services', 'title.orderServices', description, () => {window.location.href = '../../pages/profile/profile.html'});
        }
        
    });

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

    if (cards[select].length != services[select].length) {
        for (let i = 0; i < services[select].length; i++) {
            cards[select].push(createCard(services[select][i], i + 1));
        }
    }
    
    let filteredCards = cards[select].filter(card => {
        if (!filterValue.value && !inputField.value) return true; 

        const service = services[select][cards[select].indexOf(card)];
        const matchesFilter = filterValue.value ? getKeyByValue(images, images[service.image]) === filterValue.value : true;
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
        noServicesMessage.setAttribute('data-i18n-common', `services.noServiceText`);

        servicesBox.appendChild(noServicesMessage);
    } else {
        filteredCards.forEach(card => {
            servicesBox.appendChild(card);
        });
    }

    i18n.translate();
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
    selectOption.setAttribute('data-i18n-common', `services.filter.${defaultText}`);

    for(let i = 0; i < option.length; i++){
        let tempOption = document.createElement('p');
        tempOption.className = 'text-demi-s20-h30-l5 option';
        tempOption.textContent = option[i];
        tempOption.setAttribute('data-i18n-common', `services.option.${option[i]}`);

        tempOption.addEventListener('click', function(){
            if(value.value == option[i]){
                value.value = null;
                selectOption.setAttribute('data-i18n-common', `services.filter.${defaultText}`);
                selectOption.textContent = defaultText;
            }else{
                value.value = option[i];
                selectOption.setAttribute('data-i18n-common', `services.option.${option[i]}`);
                selectOption.textContent = value.value;
            }
            
            addOrShowCards();
        })
        
        optionBox.appendChild(tempOption);
    }

    i18n.translate();
}