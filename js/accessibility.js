// Accessibility settings functionality
export class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.loadSettings();
        this.applySettings();
    }

    // Загружаем настройки из localStorage
    loadSettings() {
        this.settings = {
            visuallyImpaired: localStorage.getItem('accessibility_visually_impaired') === 'true',
            fontSize: localStorage.getItem('accessibility_font_size') || 'medium',
            imagesDisabled: localStorage.getItem('accessibility_images_disabled') === 'true'
        };
    }

    // Применяем настройки к странице
    applySettings() {
        const html = document.documentElement;
        
        // Версия для слабовидящих
        if (this.settings.visuallyImpaired) {
            html.setAttribute('data-accessibility', 'enabled');
        } else {
            html.removeAttribute('data-accessibility');
        }

        // Размер шрифта
        if (this.settings.visuallyImpaired) {
            html.setAttribute('data-font-size', this.settings.fontSize);
        } else {
            html.removeAttribute('data-font-size');
        }

        // Отключение изображений
        if (this.settings.imagesDisabled) {
            html.setAttribute('data-images-disabled', 'true');
        } else {
            html.removeAttribute('data-images-disabled');
        }
    }

    // Включаем/выключаем версию для слабовидящих
    setVisuallyImpaired(enabled) {
        this.settings.visuallyImpaired = enabled;
        localStorage.setItem('accessibility_visually_impaired', enabled.toString());
        this.applySettings();
    }

    // Устанавливаем размер шрифта
    setFontSize(size) {
        this.settings.fontSize = size;
        localStorage.setItem('accessibility_font_size', size);
        this.applySettings();
    }

    // Включаем/выключаем изображения
    setImagesDisabled(disabled) {
        this.settings.imagesDisabled = disabled;
        localStorage.setItem('accessibility_images_disabled', disabled.toString());
        this.applySettings();
    }

    // Получаем текущие настройки
    getSettings() {
        return { ...this.settings };
    }
}

// Создаем глобальный экземпляр
export const accessibilityManager = new AccessibilityManager();

// Инициализируем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    accessibilityManager.init();
});
