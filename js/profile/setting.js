import i18n from "../i18n.js";


/* ----------- reset ----------- */
const reset = document.querySelector('#reset');

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



/* ------- theme ----------*/
// Функция для применения темы
export function applyTheme(theme) {
    // Сохраняем в localStorage
    localStorage.setItem('theme', theme);
    
    // Применяем к документу
    document.documentElement.setAttribute('data-theme', theme);
    
    // Обновляем текст в переключателе
    updateThemeText(theme);
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


