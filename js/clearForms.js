import { clearInputs } from "./clearInputs.js";

function clearAlerts(element){
    const alerts = element.querySelectorAll('.validation-message');
    alerts.forEach(alert => alert.classList.remove('active'));
}

function disableSubmitBtn(element){
    const btn = element.querySelector('.submit-button');
    btn.disabled = 'true';
}

const resetPopup = function(target){
    const popup = target.closest('.menu-container');
    popup.classList.remove('active');

    if(popup.querySelector('img')) return;

    setTimeout(() => {
        disableSubmitBtn(popup);
        clearAlerts(popup);
        clearInputs(popup);
    }, 300);
}

export function handlePopupExitClick(evt){
    const target = evt.target;

    if(target.classList.contains('close-button') || target.classList.contains('menu-container')){
        resetPopup(target);
    }
}