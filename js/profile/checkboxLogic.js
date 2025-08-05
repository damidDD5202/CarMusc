const checkboxes = document.querySelectorAll('.custom-checkbox-size input');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        checkboxes.forEach(cb => {
            if (cb !== this) {
                cb.checked = false; 
                cb.parentElement.classList.remove('checked');
            }
        });

        if (this.checked) {
            this.parentElement.classList.add('checked');
        } else {
            this.parentElement.classList.remove('checked');
        }
    });
});

checkboxes[0].parentElement.classList.add('checked');