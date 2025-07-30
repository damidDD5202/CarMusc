const separators = document.getElementsByClassName('separators');

function addSeparators(){
    Array.from(separators).forEach(element => {
        for(let i = 0; i < 4; i++){
            let separator = document.createElement('span');
            separator.className = 'separator';
            element.appendChild(separator);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    addSeparators();
});