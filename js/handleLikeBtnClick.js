import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db, status} from '../firebase.js';

async function updateLikeState(target){
    if(status === false) return;

    const id = target.closest('li').getAttribute('data-id');
    const currentState = target.classList.contains('like-btn_pressed');

    await updateDoc(doc(db, 'photos', id), {isLiked: !currentState});
}

export function handleLikeBtnClick(evt){
    const target = evt.target;
    if(!target.classList.contains('like-btn')) return;

    updateLikeState(target);
}