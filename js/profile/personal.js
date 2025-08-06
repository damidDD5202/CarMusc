import i18n from "../i18n.js";
import { updatePassword } from "../../server/api.js";

const data = JSON.parse(localStorage.getItem('user'));

const personal = document.querySelector('#information');
const boxPersonal = personal.getElementsByClassName('personal-container-data')[0];

function addDataPersonal(){
    const keys = ['name', 'surname', 'patronymic', 'date of birth', 'telephone', 'email'];

    const div1 = document.createElement('div');
    div1.className = 'personal-container-some';

    const div2 = document.createElement('div');
    div2.className = 'personal-container-some';

    for(let i = 0; i < keys.length; i++){
        let container = document.createElement('div');
        container.className = 'personal-container-text';

        let headerText = document.createElement('p');
        headerText.className = 'text-demi-s14-l5'
        headerText.textContent = keys[i];
        headerText.setAttribute('data-i18n', `personal.header.${keys[i]}`);

        let mainText = document.createElement('p');
        mainText.className = 'text-demi-s20-l5'
        mainText.textContent = data[keys[i]];

        container.appendChild(headerText);
        container.appendChild(mainText);

        if(i < 3){
            div1.appendChild(container);
        }else{
            div2.appendChild(container);
        }
    }

    boxPersonal.appendChild(div1);
    boxPersonal.appendChild(div2);

    i18n.translate();
}

const credentials = document.querySelector('#credentials');

function addDataCredentials(){
    const textBox = credentials.getElementsByClassName('personal-container-text')[0];
    const log = 'login';

    let headerText = document.createElement('p');
    headerText.className = 'text-demi-s14-l5'
    headerText.textContent = log;
    headerText.setAttribute('data-i18n', `personal.header.log`);

    let mainText = document.createElement('p');
    mainText.className = 'text-demi-s20-l5'
    mainText.textContent = data[log];

    textBox.appendChild(headerText);
    textBox.appendChild(mainText);

    i18n.translate();
}

addDataPersonal();
addDataCredentials();

// ----- logic for change password ---- 

const oldPassword = document.querySelector('#old');
const newPassword = document.querySelector('#new');
const changePassword = document.querySelector('#change');

changePassword.addEventListener('click', async function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (oldPassword.value !== data.password) {
        console.log('Старый пароль не совпадает');
        return;
    }

    if (newPassword.value.length < 6) {
        console.log('Новый пароль слишком короткий');
        return;
    }

    try {
        await updatePassword(data.id, newPassword.value);
        data.password = newPassword.value;
        localStorage.setItem('user', JSON.stringify(data));
        
        console.log('Пароль изменён успешно');
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
