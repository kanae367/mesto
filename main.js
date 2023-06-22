import { handleLikeBtnClick } from "./js/handleLikeBtnClick.js";
import { handleImageClick } from "./js/handleImageClick.js";
import { handleDeleteCardBtnClick } from "./js/handleDeleteBtnClick.js";
import { handlePopupExitClick } from "./js/clearForms.js";
import { setValidation } from "./js/validation.js";
import { handleProfileEditBtnClick, updateInfo } from "./js/profile.js";
import { handleAvatarEditBtnClick, changeAvatar } from "./js/avatar.js";
import { handleAddNewCardBtnClick, addNewCard } from "./js/newCard.js";
import { fetchData } from "./js/fetchData.js";

(() => {
    fetchData();

    document.addEventListener('mousedown', handlePopupExitClick);
    
    const profileEditBtn = document.querySelector('.change-info-btn');
    profileEditBtn.addEventListener('click', handleProfileEditBtnClick);
    
    const avatarEditBtn = document.querySelector('.profile__photo-container');
    avatarEditBtn.addEventListener('click', handleAvatarEditBtnClick);
    
    const addCardBtn = document.querySelector('.add-photo-btn');
    addCardBtn.addEventListener('click', handleAddNewCardBtnClick);
    
    const cardsContainer = document.querySelector('.photos__list');
    cardsContainer.addEventListener('click', handleImageClick);
    cardsContainer.addEventListener('click', handleLikeBtnClick);
    cardsContainer.addEventListener('click', handleDeleteCardBtnClick);
    
    const forms = document.querySelectorAll('.menu__form');
    forms.forEach(form => setValidation(form));
    
    infoForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        updateInfo();
    });
    
    avatarForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        changeAvatar();
    });
    
    cardForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        addNewCard();
    });
})();