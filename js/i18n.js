// let baseLanguage = 'en'
// let currentLanguage = localStorage.getItem('language') || baseLanguage;

// let translations = {};

// async function loadTranslations(lang) {
//     fetch(`/translations/${lang}.json`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to load translations');
//         }

//         return response.json();
//     })
//     .then(translations => {
//         applyTranslations(translations); // применить перевод
//     })
//     .catch(error => {
//         console.error('Error loading translations:', error);
        
//         loadTranslations(baseLanguage);
//     });
// }

// const existingClasses = ['header', 'footer', 'preloader'];
// const missingClasses = [];

// //смотрим какие секции есть общие еще
// function checkClassNames(commonTranslations) {
//     const sections = document.querySelectorAll('section'); 
//     const classNames = Array.from(sections).map(section => Array.from(section.classList));

//     classNames.forEach(className => commonTranslations[className] ? existingClasses.push(className) : missingClasses.push(className));
// }

// function applyTranslations(translations){
//     const pageName = document.body.getAttribute('data-page'); 

//     if (translations.title) document.title = translations.title;

//     checkClassNames(translations.common); 
    
//     commonTranslation(translations.common);
//     pageTranslation(translations[pageName]);

// }

// function commonTranslation(translations){
//     for(let key of existingClasses){
//         partTranslation(translations[key], `${key}`, 'data-i18n-common');
//     }
// }

// function pageTranslation(translations){
    
    
//     for(let key of missingClasses){
//         partTranslation(translations[key], `${key}`, 'data-i18n');
//     }
// }

// function partTranslation(translations, option, data) {
//     if (typeof translations !== 'object' || translations === null) {
//         return; 
//     }

//     for (const key in translations) {
//         if (translations.hasOwnProperty(key)) {
//             const value = translations[key];

//             if (typeof value === 'object' && value !== null) {
//                 partTranslation(value, `${option}.${key}`, data);
//             } else {
//                 const element = document.querySelector(`[${data}="${option}.${key}"]`);
//                 if (element) {
//                     if (option.includes('placeholder')) {
//                         element.placeholder = value; 
//                     } else {
//                         element.innerText = value; 
//                     }
//                 }
//             }
//         }
//     }
// }

// document.addEventListener('DOMContentLoaded', loadTranslations(currentLanguage));

// export default loadTranslations;



let baseLanguage = 'ru';
// let currentLanguage = localStorage.getItem('language') || 'en';
let currentLanguage = baseLanguage;
let translations = {};

// Кэш для переведённых элементов
const translatedElements = new WeakSet();

async function loadTranslations(lang = currentLanguage) {
    try {
        const response = await fetch(`/translations/${lang}.json`);
        if (!response.ok) throw new Error('Failed to load translations');
        
        translations = await response.json();
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        applyTranslations();
        return true; // Успешная загрузка
    } catch (error) {
        console.error('Error loading translations:', error);
        if (lang !== baseLanguage) {
            return loadTranslations(baseLanguage); // Fallback
        }
        return false;
    }
}

function applyTranslations() {
    const pageName = document.body.getAttribute('data-page');
    
    if (translations[pageName]?.title) {
        document.title = translations[pageName].title;
    }
    
    translateSection('common', 'data-i18n-common');
    
    if (translations[pageName]) {
        translateSection(pageName, 'data-i18n');
    }
}

function translateSection(section, attribute) {
    
    const elements = document.querySelectorAll(`[${attribute}]`);

    elements.forEach(el => {
        if (translatedElements.has(el)) return;
        
        const keys = el.getAttribute(attribute).split('.');
        let value = keys.reduce((obj, key) => obj?.[key], translations[section]);
        
        if (value) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else {
                el.textContent = value;
            }
            translatedElements.add(el);
        }
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLanguage);
});

// Экспортируем API для внешнего использования
export default {
    setLanguage: loadTranslations,
    currentLanguage: () => currentLanguage,
    translate: () => applyTranslations() // Для ручного вызова
};