import { createCard } from './createCard.js';
import { collection, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db, status } from '../firebase.js';

export async function fetchCards(){
    if(status === false) return;
    const ref = query(collection(db, "photos"), orderBy("timestamp"));

    await onSnapshot(ref, (snapshot) => {
        const cardsArray = [];
        snapshot.docs.map(item => cardsArray.push({...item.data(), id: item.id}));
        document.querySelector('.photos__list').innerHTML = '';
        cardsArray.forEach(item => createCard(item.name, item.imagelink, item.id, item.isLiked));
    })
}