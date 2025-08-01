const gallery = document.querySelector('.gallery');

let isDown = false;
let startX;
let scrollLeft;

gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.classList.add('active');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
});

gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('active');
});

gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('active');
});

gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return; // остановить выполнение, если не нажата кнопка мыши
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX); // скорость прокрутки
    gallery.scrollLeft = scrollLeft - walk;
});
