import i18n from "../i18n.js";
import { updatePassword } from "../../server/api.js";
import { openModal } from "../modal.js";

const user = JSON.parse(localStorage.getItem('user'));

const personal = document.querySelector('#information');
const boxPersonal = personal.getElementsByClassName('personal-container-data')[0];

const guestBox = document.getElementsByClassName('personal-guest')[0];
const mainBox = document.getElementsByClassName('personal-box')[0];
const serviceBox = document.getElementsByClassName('services')[0];

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
        mainText.textContent = user[keys[i]];

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
    mainText.textContent = user[log];

    textBox.appendChild(headerText);
    textBox.appendChild(mainText);

    i18n.translate();
}

document.addEventListener('DOMContentLoaded', function(){
    if(user){
        guestBox.remove();
        
        addDataPersonal();
        addDataCredentials();
    }else{
        addDataGuest();
    }
})

function addDataGuest(){
    mainBox.style.setProperty('justify-content', 'left', 'important');
    boxPersonal.remove();
    credentials.remove();
    serviceBox.remove();
}


// ----- logic for change password ---- 

const oldPassword = document.querySelector('#old');
const newPassword = document.querySelector('#new');
const changePassword = document.querySelector('#change');

changePassword.addEventListener('click', async function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (oldPassword.value !== user.password) {
        console.log('Старый пароль не совпадает');
        return;
    }

    if (newPassword.value.length < 6) {
        console.log('Новый пароль слишком короткий');
        return;
    }

    const description = document.createElement('p');
    description.classList.add('text-demi-s20-l5');
    description.classList.add('desc');

    try {
        await updatePassword(user.id, newPassword.value);
        user.password = newPassword.value;
        localStorage.setItem('user', JSON.stringify(user));
        
        oldPassword.value = '';
        newPassword.value = ''

        description.textContent = 'Your password has been successfully changed!';

        openModal('Changing the password', description, () => {
            console.log('change password');
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
