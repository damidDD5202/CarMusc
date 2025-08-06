import { getUsers, addUser } from "../../server/api.js";

const userData = {};
let users;

document.addEventListener('DOMContentLoaded', async () => {
    await loadUsers();

    inputHandler('name', (value) => (value.length < 2 || value.length > 20));
    inputHandler('surname', (value) => (value.length < 2 || value.length > 20));
    inputHandler('patronymic', (value) => value.length > 20);
    inputHandler('telephone', (value) => false);
    inputHandler('date', formattedDateOfBirthError, formattedDateOfBirthInput);
    inputHandler('email', (value) => false);
    inputHandler('login', (value) => false);
    inputHandler('password', (value) => false);
    inputHandler('repeatThePassword', (value) => false);
});
  
function inputHandler(someName, funcError, customInput = null){
    const some = returnInputError(someName);

    some.input.addEventListener('input', () =>{
        if(!customInput){
            userData[someName] = some.input.value.trim();
            some.box.classList.remove('error');
        }else{
            customInput(some.input);
        }

    })

    errorHandler(some, funcError);
}

function errorHandler(some, funcError){
    some.input.addEventListener('blur', () => {
        funcError(some.input.value.trim()) ? some.box.classList.add('error') : some.box.classList.remove('error');
    });
}

function returnInputError(name) {
    console.log(name) 
    const box = document.querySelector(`#${name}`);

    const input = box.querySelector('input');
    const error = box.querySelector('p');

    return { box, input, error };
}

async function loadUsers() {
    users = await getUsers();
}

async function maxIndex() {
    const maxId = users.reduce((max, user) => {
        return Math.max(max, parseInt(user.id));
    }, 0);

    return maxId;
}



// ----------- DATE OF BIRTH ----------------



function formattedDateOfBirthError(value) {
    const regex = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/;

    if (!regex.test(value)) return true; // Неверный формат даты

    const [day, month, year] = value.split('.').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const minDate = new Date(1990, 0, 1); // 01.01.1990

    // Проверка на допустимость даты
    if (birthDate < minDate || birthDate > today) {
        return true; // Дата недопустима
    }

    // Проверка на возраст старше 16 лет
    return !(today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), month - 1, day)) >= 16);
}

function formattedDateOfBirthInput(inputElement) {
    let value = inputElement.value.replace(/[^0-9]/g, ''); // Удаляем всё, кроме цифр

    // Автоматически добавляем точки при вводе
    if (value.length > 2) value = value.slice(0, 2) + '.' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '.' + value.slice(5, 9);
    value = value.slice(0, 10); // Ограничиваем длину

    // Разбиваем на день, месяц и год
    const [day = '', month = '', year = ''] = value.split('.');

    // Корректируем месяц (не больше 12)
    const monthNum = parseInt(month, 10);
    if (monthNum > 12) {
        value = `${day}.12${year ? '.' + year : ''}`;
    } else {
        // Корректируем день (в зависимости от месяца)
        const dayNum = parseInt(day, 10);
        if (day.length === 2 && month.length === 2 && dayNum > getMaxDaysInMonth(monthNum, year)) {
            const maxDays = getMaxDaysInMonth(monthNum, year);
            value = `${maxDays.toString().padStart(2, '0')}.${month}${year ? '.' + year : ''}`;
        }
    }

    inputElement.value = value;
    userData['date of birth'] = value;
}

// Функция для определения максимального числа дней в месяце
function getMaxDaysInMonth(month, year) {
    if (month === 2) {
        if (year && year.length === 4) {
            const yearNum = parseInt(year, 10);
            return ((yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0) ? 29 : 28;
        }
        return 28; // Если год не введён, считаем невисокосным
    }
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
}



// ------------------ REGISTRATION ---------------------


const regButton = document.querySelector('#registration');

regButton.addEventListener('click', async function(event){
    if(!checkField()){
        console.log('есть ошибки и незаполненные поля'); // модальное окно
    }else{
        try {
            userData.id = await maxIndex() + 1;
            userData.service = {ordered: [], completed: []};

            await addUser(userData);

            window.location.href = '../../pages/authorization/authorization.html';
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
        }
    }
})

function checkField() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.focus();
    });

    const hasError = document.querySelector('.error') !== null;

    const checkbox = document.querySelector('#agree input[type="checkbox"]');
    const isCheckboxChecked = checkbox ? checkbox.checked : false;

    return !hasError && isCheckboxChecked;
}