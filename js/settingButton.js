import { openModal } from "./modal.js";

const user = JSON.parse(localStorage.getItem('user'));

const header = document.getElementsByTagName('header')[0];
const setting = header.getElementsByTagName('button')[0];

setting.addEventListener('click', () => {
    openModal('Setting', 'title.setting', createContentForModal(), () => console.log('Exit of setting'));
});


function createContentForModal(){
    const content = document.createElement('div');

    Object.assign(content.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
    });

    const setting = createButton('If you want to customize the page', 'wantCustomize','Setting', 'setting',
        window.location.href.includes('/index.html') || window.location.href.endsWith('/') ? './pages/profile/profile.html#settingBox' : '../../pages/profile/profile.html#settingBox'
    );
    const auth = createButton('If you want to log in to another account', 'wantAuth', 'Authorization', 'authorization',
        window.location.href.includes('/index.html') || window.location.href.endsWith('/') ? './pages/authorization/authorization.html' : '../../pages/authorization/authorization.html'
    );
    const reg = createButton('If you want to create a new account', 'wantRed', 'Registration', 'registration',
        window.location.href.includes('/index.html') || window.location.href.endsWith('/') ? './pages/registration/registration.html' : '../../pages/registration/registration.html'
    );

    let logOut;
    if (user) {
        logOut = createButton('If you want to log out of your account', 'wantLogOut', 'Log out', 'logOut',
            window.location.href.includes('/index.html') || window.location.href.endsWith('/') ? './pages/authorization/authorization.html' : '../../pages/authorization/authorization.html',
            true
        );
    }
    
    content.appendChild(setting);
    content.appendChild(auth);
    content.appendChild(reg);
    user && content.appendChild(logOut);

    return content;
}


function createButton(desc, desci18, text, texti18, ref, func){
    const div = document.createElement('div');
    Object.assign(div.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    });

    const description = document.createElement('p');
    description.className = 'text-demi-s18-h25-l5';
    description.textContent = desc;
    description.setAttribute('data-i18n-common', `modal.description.${desci18}`);

    const link = document.createElement('a');
    link.textContent = text;
    link.href = ref;
    link.className = 'text-demi-24-l5 setBut';
    link.setAttribute('data-i18n-common', `modal.link.${texti18}`);

    if(func){
        link.addEventListener('click', () => {
            localStorage.clear();
        })
    }
        
    div.appendChild(description);
    div.appendChild(link);

    return div;
}