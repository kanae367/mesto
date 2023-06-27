import { fetchCards } from "./fetchCards.js";
import { fetchAvatar } from "./avatar.js";
import { fetchProfileData } from "./profile.js";
import { createCard } from "./createCard.js";
import { status } from "../firebase.js";

function startCoroutine(){
    fetchCards();
    fetchAvatar();
    fetchProfileData();
}

function createPlaceholders(){
    for(let i = 0; i < 6; i++){
        createCard("...", 'images/image-placeholder.png', 0);
    }
}

let handleStatusChange = null;
let displayError = null;

function checkStatus(){
    if(status){
        createPlaceholders();
        startCoroutine();
        
        clearInterval(handleStatusChange);
        clearTimeout(displayError);
    }
}

export function fetchData(){
    handleStatusChange = setInterval(checkStatus, 50);
    
    displayError = setTimeout(() => {
        document.querySelector('ul').innerHTML =
        `<div class="no-response">
            <h2>Ошибка при попытке получить данные от сервера.</h2>
        </div>`;
    }, 2000);    
}