import { createCard } from './createCard.js';
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from '../firebase.js';

export async function updateCards(){
    await onSnapshot(collection(db, 'photos'), (snapshot) => {
        const cardsArray = [];
        snapshot.docs.map(item => cardsArray.push({...item.data(), id: item.id}));
        cardsArray.sort((a, b) => a.timestamp - b.timestamp);
        cardsArray.forEach(item => createCard(item.name, item.imagelink, item.id));
    })
}