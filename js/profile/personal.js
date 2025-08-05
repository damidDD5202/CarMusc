const data = {
    name: 'damid',
    surname: 'damidov',
    patronymic: 'damidovich',
    'date of birth': '22.05.2003',
    telephone: '+375 (29) 251-33-11',
    email: 'damid@gmail.com',
}

const dataAuth = {
    login: 'damid8822',
    password: ''
}

const personal = document.querySelector('#information');
const boxPersonal = personal.getElementsByClassName('personal-container-data')[0];

function addDataPersonal(){
    const keys = Object.keys(data);

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
}

const credentials = document.querySelector('#credentials');

function addDataCredentials(){
    const textBox = credentials.getElementsByClassName('personal-container-text')[0];
    const log = 'login';

    let headerText = document.createElement('p');
    headerText.className = 'text-demi-s14-l5'
    headerText.textContent = log;

    let mainText = document.createElement('p');
    mainText.className = 'text-demi-s20-l5'
    mainText.textContent = dataAuth[log];

    textBox.appendChild(headerText);
    textBox.appendChild(mainText);
}

addDataPersonal();
addDataCredentials();