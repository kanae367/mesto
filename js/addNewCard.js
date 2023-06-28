import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db, status } from '../firebase.js';
import { clearInputs } from "./clearInputs.js";
import { handleImageNotFoundError } from "./handleImageNotFoundError.js";

const cardNameInput = cardForm[0];
const cardUrlInput = cardForm[1];

export function addNewCard(){
    if(status === false) return;

    const testImage = new Image()
    testImage.src = cardUrlInput.value;

    testImage.addEventListener('load', () => {
        addDoc(collection(db, "photos"), {name: cardNameInput.value, imagelink: cardUrlInput.value, timestamp: new Date().getTime()});
        clearInputs(cardForm);
    });

    testImage.addEventListener('error', () => {
        handleImageNotFoundError('card');
        clearInputs(cardForm);
    });
}