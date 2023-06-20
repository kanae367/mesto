const alerts = document.querySelectorAll('.validation-message'); 
const inputs = document.querySelectorAll('.menu__input');
const btns = document.querySelectorAll('.submit-button');

const resetPopups = function(element){
    element.closest('.menu-container').classList.remove('active');

    setTimeout(() => {
        for(const btn of btns) btn.disabled = 'true';
        for(const alert of alerts) alert.classList.remove('active');
        for(const input of inputs){
            input.style.borderBottom = '';
            input.value = '';
        }
    }, 300);
}

export function handlePopupExitClick(evt){
    const target = evt.target;

    if(target.classList.contains('close-button') || target.classList.contains('menu-container')){
        resetPopups(target);
    }
}