import i18n from "../i18n.js";


/* ----------- reset ----------- */
const reset = document.querySelector('#reset');
if(reset){
    reset.addEventListener('click', function() {

        // Удаляем все ключи, кроме 'user'
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key !== 'user') {
                localStorage.removeItem(key);
            }
        }
        location.reload();
        
    });
}



/* ------- theme ----------*/
// Функция для применения темы
export function applyTheme(theme) {
    // Сохраняем в localStorage
    localStorage.setItem('theme', theme);
    
    // Применяем к документу
    document.documentElement.setAttribute('data-theme', theme);
    
    // Обновляем текст в переключателе
    updateThemeText(theme);
    initPalette(); //=------------------------------
}

// Функция для обновления текста переключателя
function updateThemeText(theme) {
    const lang = localStorage.getItem('language') || 'en';
    const selectTheme = document.querySelector('#theme .option-select');
    
    if (selectTheme) {
        selectTheme.textContent = getThemeDisplayName(theme, lang);
        selectTheme.setAttribute('data-i18n', `theme.${theme}`);
    }
}

// Функция для получения локализованного названия темы
function getThemeDisplayName(theme, lang) {
    const names = {
        light: { en: 'Light', ru: 'Светлая' },
        dark: { en: 'Dark', ru: 'Тёмная' }
    };
    return names[theme]?.[lang] || names[theme].en;
}

// Инициализация темы при загрузке
export function initTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);
}

// Подключение обработчиков для переключателя
export function setupThemeSwitcher() {
    const theme = document.querySelector('#theme');
    if (!theme) return;

    const options = Array.from(theme.getElementsByClassName('option'));

    options.forEach(option => {
        option.addEventListener('click', function() {
            const targetTheme = this.getAttribute('data-target');
            applyTheme(targetTheme);
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupThemeSwitcher();
    initPalette();
});



/* ------- change language ----------*/


const language = document.querySelector('#language');
if (language) {
    const selectLanguage = language.querySelector('.option-select');
    const options = Array.from(language.getElementsByClassName('option'));

    // Инициализация текущего языка
    const updateLanguageDisplay = () => {
        const lang = localStorage.getItem('language') || 'en';
        selectLanguage.textContent = lang === 'en' ? 'English' : 'Русский';
        selectLanguage.setAttribute('data-i18n', `language.${lang}`);
    };

    updateLanguageDisplay();

    // Обработчики выбора языка
    options.forEach(option => {
        option.addEventListener('click', async function() {
            const targetLang = this.getAttribute('data-target');
            
            if (i18n.currentLanguage() !== targetLang) {
                // Оптимистичное обновление UI
                selectLanguage.textContent = this.textContent;
                
                try {
                    await i18n.setLanguage(targetLang);
                    
                    // Особые случаи - вручную обновляем динамические элементы
                    if (window.addOrShowCards) {
                        window.addOrShowCards();
                    }
                } catch (error) {
                    console.error('Language change failed:', error);
                    // Возвращаем предыдущее значение
                    updateLanguageDisplay();
                }
            }
        });
    });
}




/* ------- change palette ----------*/

const palette = document.querySelector('#palette');
const options = document.querySelectorAll('#palette .option');

if (palette) {
    options.forEach(option => {
        option.addEventListener('click', function() {
            const selectedPalette = this.getAttribute('value');
            applyPalette(selectedPalette);
        });
    });
}

// Функция для применения палитры
export function applyPalette(palette) {
    // Сохраняем в localStorage
    localStorage.setItem('palette', palette);
    
    // Применяем палитру к документу
    document.documentElement.setAttribute('data-palette', palette);
    
    // Обновляем стили в зависимости от текущей темы и выбранной палитры
    updatePaletteStyles(palette);
}

// Функция для обновления стилей палитры
export function updatePaletteStyles(palette) {
    const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
    
    if (isLightTheme) {
        switch (palette) {
            case 'default':
                document.documentElement.style.setProperty('--help', '#BE2B31');
                document.documentElement.style.setProperty('--text-color', '#141414');
                break;
            case 'alternative1':
                document.documentElement.style.setProperty('--help', '#89aa26ff');
                document.documentElement.style.setProperty('--text-color', '#333333');
                break;
            case 'alternative2':
                document.documentElement.style.setProperty('--help', '#4a89dc');
                document.documentElement.style.setProperty('--text-color', '#222222');
                break;
            default:
                break;
        }
    } else {
        // Темная тема
        switch (palette) {
            case 'default':
                document.documentElement.style.setProperty('--help', '#BE2B31');
                document.documentElement.style.setProperty('--text-color', '#ffffff');
                break;
            case 'alternative1':
                document.documentElement.style.setProperty('--help', '#bababa');
                document.documentElement.style.setProperty('--text-color', '#e0e0e0');
                break;
            case 'alternative2':
                document.documentElement.style.setProperty('--help', '#69717aff');
                document.documentElement.style.setProperty('--text-color', '#f5f5f5');
                break;
            default:
                break;
        }
    }
}

export function initPalette() {
    const currentPalette = localStorage.getItem('palette') || 'default';
    applyPalette(currentPalette);
}
