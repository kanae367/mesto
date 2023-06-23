import { onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db, status } from '../firebase.js';


export async function fetchAvatar(){
    if(status === false) return;
    
    await onSnapshot(doc(db, 'profile', 'image'), (snapshot) => {
        const imagesrc = snapshot.data().imagesrc;
        setAvatar(imagesrc);
    })
}

function setAvatar(src){
    const avatar = document.querySelector('.profile__photo');
    const avatarUrlInput = avatarForm[0];

    avatar.src = src;
    avatarUrlInput.value = '';
};

export function changeAvatar(){
    if(status === false) return;
    
    const avatarUrlInput = avatarForm[0];
    const testImage = new Image()
    testImage.src = avatarUrlInput.value;
    testImage.addEventListener('load', () => {
        updateDoc(doc(db, 'profile', 'image'), {imagesrc: avatarUrlInput.value})
    });
    testImage.addEventListener('error', () => {
        alert('Невозможно установить изображение. Ссылка должна вести к изображению.');
        avatarUrlInput.value = '';
    });
}

export function handleAvatarEditBtnClick(){
    const changeAvatarPopup = document.getElementById('change-avatar-popup');
    changeAvatarPopup.classList.add('active');
}