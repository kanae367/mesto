import { onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from '../firebase.js';

const avatar = document.querySelector('.profile__photo');
const avatarUrlInput = avatarForm[0];

export async function fetchAvatar(){
    await onSnapshot(doc(db, 'profile', 'image'), (snapshot) => {
        const imagesrc = snapshot.data().imagesrc;
        setAvatar(imagesrc);
    })
}

function setAvatar(src){
    avatar.src = src;
    avatarUrlInput.value = '';
};

export async function changeAvatar(){
    await updateDoc(doc(db, 'profile', 'image'), {imagesrc: avatarUrlInput.value})
}

export function handleAvatarEditBtnClick(){
    const changeAvatarPopup = document.getElementById('change-avatar-popup');
    changeAvatarPopup.classList.add('active');
}