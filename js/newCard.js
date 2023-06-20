import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from '../firebase.js';

const cardNameInput = cardForm[0];
const cardUrlInput = cardForm[1];

export function addNewCard(){
    addDoc(collection(db, "photos"), {name: cardNameInput.value, imagelink: cardUrlInput.value, timestamp: new Date().getTime()})
    cardNameInput.value = '';
    cardUrlInput.value = '';
}

export function handleAddNewCardBtnClick(){
    const createCardPopup = document.getElementById('add-card-popup');
    createCardPopup.classList.add('active');
}