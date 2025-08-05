const selectAll = document.querySelectorAll('.select');

let lastSelect;

selectAll.forEach(select => {
    select.addEventListener('click', function(event) {
        event.stopPropagation();

        select.classList.toggle('active');

        if(lastSelect){
            lastSelect.classList.remove('active');
            lastSelect = select;
        }else{
            lastSelect = select;
        }
    });
})

document.addEventListener('click', function() {
    lastSelect = null;

    selectAll.forEach(select => {
        select.classList.remove('active');
    });
});