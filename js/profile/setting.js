import i18n from "../i18n.js";


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



/* ----------- reset ----------- */
const reset = document.querySelector('#reset');

reset.addEventListener('click', function(){
    // добавить всплытие предупреждающего окна;
    localStorage.clear();
    location.reload();
})