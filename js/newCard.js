import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db, status } from '../firebase.js';

const cardNameInput = cardForm[0];
const cardUrlInput = cardForm[1];

function clearInputs(){
    cardNameInput.value = '';
    cardUrlInput.value = '';
}

export function addNewCard(){
    if(status === false) return;

    const testImage = new Image()
    testImage.src = cardUrlInput.value;
    testImage.addEventListener('load', () => {
        addDoc(collection(db, "photos"), {name: cardNameInput.value, imagelink: cardUrlInput.value, timestamp: new Date().getTime()});
        clearInputs();
    });
    testImage.addEventListener('error', () => {
        alert('Хорошая попытка. Это не картинка');
        clearInputs();
    });

}

export function handleAddNewCardBtnClick(){
    const createCardPopup = document.getElementById('add-card-popup');
    createCardPopup.classList.add('active');
}