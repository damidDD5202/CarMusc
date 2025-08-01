window.addEventListener('load', () => {
    // Задержка в 300 мс после полной загрузки страницы
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none'; // Скрыть прелоадер
    }, 500);
});