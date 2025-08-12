const gallery = document.querySelector('.gallery');

// --- show ---


const images = {
    0: [
        '../../assets/images/gallery11.jpg',
        '../../assets/images/gc2.jpg',
        '../../assets/images/gallery12.jpg',
        '../../assets/images/gc4.jpg',
    ],
    1: [
        '../../assets/images/tempgallery111.jpg',
        '../../assets/images/gallery22.jpg',
        '../../assets/images/gc3.jpg',
        '../../assets/images/gallery21.jpg',
    ]
}

const lineGallery = gallery.getElementsByTagName('div');

function showGallery(){
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < images[i].length; j++){
            let image = document.createElement('img');
            image.src = images[i][j];

            lineGallery[i].appendChild(image);
        }
    }
}

showGallery();


// --- scroll ---


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
