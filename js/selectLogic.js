import i18n from "./i18n.js";

const selectAll = document.querySelectorAll('.select');

let lastSelect;

selectAll.forEach(select => {
    select.addEventListener('click', function(event) {
        event.stopPropagation();

        if (select.classList.contains('active')) {
            select.classList.remove('active');
            lastSelect = null; 
        } else {
            if (lastSelect) {
                lastSelect.classList.remove('active');
            }
            select.classList.add('active'); 
            lastSelect = select; 
        }
    });
})

document.addEventListener('click', function() {
    selectAll.forEach(select => {
        select.classList.remove('active');
    });
    
    lastSelect = null;
});