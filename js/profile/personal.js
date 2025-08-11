import i18n from "../i18n.js";
import { updatePassword } from "../../server/api.js";
import { openModal } from "../modal.js";

const commonPasswords = [
    "Tes1_0000",
    "password",
    "123456",
    "123456789",
    "guest",
    "QWERTY",
    "12345678",
    "111111",
    "12345",
    "col123456",
    "123123",
    "1234567",
    "1234",
    "1234567890",
    "000000",
    "555555",
    "666666",
    "123321",
    "654321",
    "7777777",
    "123",
    "d1lakiss",
    "777777",
    "110110jp",
    "1111",
    "987654321",
    "121212",
    "gizli",
    "abc123",
    "112233",
    "azerty",
    "159753",
    "1q2w3e4r",
    "54321",
    "[email protected]",
    "222222",
    "qwertyuiop",
    "qwerty123",
    "qazwsx",
    "vip",
    "asdasd",
    "123qwe",
    "123654",
    "iloveyou",
    "a1b2c3",
    "999999",
    "Groupd2013",
    "1q2w3e",
    "usr",
    "Liman1000",
    "1111111",
    "333333",
    "123123123",
    "9136668099",
    "11111111",
    "1qaz2wsx",
    "password1",
    "mar20lt",
    "987654321",
    "gfhjkm",
    "159357",
    "abcd1234",
    "131313",
    "789456",
    "luzit2000",
    "aaaaaa",
    "zxcvbnm",
    "asdfghjkl",
    "1234qwer",
    "88888888",
    "dragon",
    "987654",
    "888888",
    "qwe123",
    "soccer",
    "3601",
    "asdfgh",
    "master",
    "samsung",
    "12345678910",
    "killer",
    "1237895",
    "1234561",
    "12344321",
    "daniel",
    "00000",
    "444444",
    "101010",
    "f–you",
    "qazwsxedc",
    "789456123",
    "super123",
    "qwer1234",
    "123456789a",
    "823477aA",
    "147258369",
    "unknown",
    "98765",
    "q1w2e3r4",
    "232323"
];

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
        mainText.textContent = user[keys[i]] ?? '-';

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
        openModal('The old password doesn\'t match', 'title.oldPassword', null, () => {
            
        });

        return;
    }
    
    const dataError = inputPassword();
    if(!dataError){
        try {
            await updatePassword(user.id, newPassword.value);
            user.password = newPassword.value;
            localStorage.setItem('user', JSON.stringify(user));
            
            oldPassword.value = '';
            newPassword.value = '';

            const description = document.createElement('p');
            description.classList.add('text-demi-s20-l5');
            description.classList.add('desc');
            description.textContent = 'Password changed successfully';
            description.setAttribute('data-i18', 'profile.modal.success');

            openModal('Changing the password', 'title.changingPassword', description, () => {
                console.log('change password');
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }else{
        openModal('Error! Changing the password', 'title.changingPasswordError', dataError, () => {
            console.log('error change password');
        });
    }
});

function inputPassword(){
    const password = newPassword.value;

    const description = document.createElement('p');
    description.classList.add('text-demi-s20-l5');
    description.classList.add('desc');

    let error;

    if(!/[a-z]/.test(password)){
        error = {
            text: 'The password must include at least one lowercase letter',
            texti18: '1'
        }
    }else{
        if(!/[A-Z]/.test(password)){
            error = {
                text: 'The password must include at least one capital letter',
                texti18: '2'
            }
        }else{
            if(!/\d/.test(password)){
                error = {
                    text: 'The password must include at least one circe',
                    texti18: '3'
                }
            }else{
                if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {
                    error = {
                        text: 'The password must include at least one special character',
                        texti18: '4'
                    }
                }else{
                    if(password.length < 8 || password.length > 20){
                        error = {
                            text: 'The password must contain 8-20 characters',
                            texti18: '5'
                        }
                    }else{
                        if(commonPasswords.includes(password)){
                            error = {
                                text: 'The password should not be among the top 100 passwords of 2023',
                                texti18: '6'
                            }
                        }
                    }
                }
            }
        }
    }       

    if(!error){
        return null
    }

    description.textContent = error.text;
    description.setAttribute('data-i18',`registration.error.${error.texti18}`);

    return description;
}