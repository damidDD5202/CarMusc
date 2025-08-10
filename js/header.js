const header = document.getElementsByTagName('header')[0];
const burgerButton = header.getElementsByClassName('burger-menu')[0];
const burgerMenu = header.getElementsByClassName('menu')[0];
const overlay = header.getElementsByClassName('overlay')[0];

let flag = false;

const halfElements = document.querySelectorAll('.half');
const formElements = document.querySelectorAll('.form');
const customElements = document.querySelector('.filter-section');
const filterlements = document.querySelector('.services-filter');

const all = [...halfElements, ...formElements];

burgerButton.addEventListener('click', function() {
    burgerMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Запрет прокруткиц

    if (!flag) {
        if(all && !window.location.href.includes('/index.html')) all.forEach(element => {
            element.style.position = 'sticky';                
        });
        if(customElements) customElements.style.position = 'sticky';
        if(filterlements) filterlements.style.position = 'sticky';

        flag = true;
        } else {

        if(all && !window.location.href.includes('/index.html')) all.forEach(element => {
            element.style.position = 'relative';
        });
        if(customElements) customElements.style.position = 'relative';
        if(filterlements) filterlements.style.position = 'relative';

        flag = false;
    }  
    
});

// Закрытие меню при клике на затемняющий фон
overlay.addEventListener('click', function() {
    burgerMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll'); // Разрешить прокрутку

    if(all && !window.location.href.includes('/index.html')) all.forEach(element => {
        element.style.position = 'relative';
    });
    if(customElements) customElements.style.position = 'relative';
    if(filterlements) filterlements.style.position = 'relative';

    
        if(window.location.href.includes('/index.html')) all.forEach(element => {
            element.style.position = 'absolute';                
        });

    flag = false;
});

// общую часть можно вынести в функцию