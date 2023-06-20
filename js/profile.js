import { onSnapshot, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from '../firebase.js';

export async function fetchProfileData(){
    await onSnapshot(doc(db, 'profile', 'information'), (snapshot) => {
        const profileInfo = snapshot.data();
        setProfileInfo(profileInfo.name, profileInfo.additionalinfo);
    })
}

export async function updateInfo(){
    await updateDoc(doc(db, 'profile', 'information'), {name: profileNameInput.value, additionalinfo: profileOtherInfoInput.value});
}

const profileName = document.querySelector('.info__name');
const otherInfo = document.querySelector('.info__text');
const profileNameInput = infoForm[0];
const profileOtherInfoInput = infoForm[1];

function setInitialInputValue(){
    profileNameInput.value = profileName.textContent;
    profileOtherInfoInput.value = otherInfo.textContent;
}

function setProfileInfo(name, other){
    const pageTitle = document.querySelector('title');
    pageTitle.innerHTML = name;
    profileName.textContent = name;
    otherInfo.textContent = other;
}

export function handleProfileEditBtnClick(){
    setInitialInputValue();
    const changeInformationPopup = document.getElementById('update-info-popup');
    changeInformationPopup.classList.add('active');
};