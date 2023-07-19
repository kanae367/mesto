import { onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db, status } from './firebase/firebase.js';
import { handleImageNotFoundError } from "./handleImageNotFoundError.js";


export async function fetchAvatar(){
    if(status === false) return;
    
    await onSnapshot(doc(db, 'profile', 'image'), (snapshot) => {
        const imagesrc = snapshot.data().imagesrc;
        setAvatar(imagesrc);
    })
}

const avatar = document.querySelector('.profile__photo');
const avatarUrlInput = avatarForm[0];

function setAvatar(src){
    avatar.src = src;
    avatarUrlInput.value = '';
};

export function changeAvatar(){
    if(status === false) return;

    const testImage = new Image()
    testImage.src = avatarUrlInput.value;
    testImage.addEventListener('load', () => {
        updateDoc(doc(db, 'profile', 'image'), {imagesrc: avatarUrlInput.value})
    });
    testImage.addEventListener('error', () => {
        handleImageNotFoundError('avatar');
        avatarUrlInput.value = '';
    });
}

const changeAvatarPopup = document.getElementById('change-avatar-popup');

export function handleAvatarEditBtnClick(){
    changeAvatarPopup.classList.add('active');
}