import i18n from "./i18n.js";

let isModalOpen = false; 

export const createModal = (title, titlei18n, content, onConfirm) => {
    if (isModalOpen) return; 

    isModalOpen = true; 

    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';

    const modalTitle = document.createElement('p');
    modalTitle.className = 'text-demi-30-l5'
    modalTitle.textContent = title;
    modalTitle.setAttribute('data-i18n-common', `modal.${titlei18n}`);

    const confirmButton = document.createElement('button');
    confirmButton.classList.add('half');
    
    const textButton = document.createElement('p');
    textButton.className = 'text-demi-24-l5'
    textButton.textContent = 'Confirm';
    textButton.setAttribute('data-i18n-common', 'modal.func.confirm');

    const spanButton = document.createElement('span');
        
    confirmButton.appendChild(textButton);
    confirmButton.appendChild(spanButton);

    // Добавляем обработчики событий
    closeButton.onclick = () => {
        closeModal(modal);
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    };

    confirmButton.onclick = () => {
        if (onConfirm) {
            onConfirm(); // Вызываем переданную функцию
        }
        closeModal(modal); // Закрываем модальное окно
    };

    // Собираем элементы
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalTitle);
    content && modalContent.appendChild(content);
    modalContent.appendChild(confirmButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    i18n.translate();
    document.body.style.overflow = 'hidden';
};

const closeModal = (modal) => {
    document.body.removeChild(modal);
    isModalOpen = false; 
    document.body.style.overflow = '';
};

export const openModal = (title, titlei18n, content, onConfirm) => {
    createModal(title, titlei18n, content, onConfirm);
};
