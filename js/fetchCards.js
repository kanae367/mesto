import { createCard } from './createCard.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db, status } from '../firebase.js';

export async function fetchCards(){
    if(status === false) return;

    await onSnapshot(collection(db, 'photos'), (snapshot) => {
        const cardsArray = [];
        snapshot.docs.map(item => cardsArray.push({...item.data(), id: item.id}));
        cardsArray.sort((a, b) => a.timestamp - b.timestamp);
        document.querySelectorAll('.photos__list-item').forEach(item => item.remove());
        cardsArray.forEach(item => createCard(item.name, item.imagelink, item.id, item.isLiked));
    })
}