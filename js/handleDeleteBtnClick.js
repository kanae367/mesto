import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from '../firebase.js';

const body = document.querySelector('body');
const confirmPopupTemplate = document.querySelector('#confirm-popup');

function handleConfirmBtnClick(element, popupBtn){
    if(db === false) return;

    const listItem = element.closest('li');
    const id = listItem.getAttribute('data-id');
    deleteDoc(doc(db, 'photos', id))
    popupBtn.closest('.menu-container').remove();
}

function createConfirmPopup(element){
    const confirmPopup = confirmPopupTemplate.content.cloneNode(true);
    const confirmPopupBtn = confirmPopup.querySelector('.submit-button');
    const closeBtn = confirmPopup.querySelector('.close-button');
    confirmPopupBtn.style.marginTop = '0';
    body.append(confirmPopup);
    
    setTimeout(() => {
        closeBtn.closest('.menu-container').classList.add('active');
    }, 50);

    confirmPopupBtn.addEventListener('click', () => handleConfirmBtnClick(element, confirmPopupBtn));
    closeBtn.addEventListener('click', () => closeBtn.closest('.menu-container').remove());
};


export function handleDeleteCardBtnClick(evt){
    const target = evt.target;
    if(!target.classList.contains('delete-item')) return;

    createConfirmPopup(target);
};
