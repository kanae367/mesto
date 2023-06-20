import { createImagePopup } from "./createImagePopup.js";

export function handleImageClick(evt){
    const target = evt.target;
    if(!target.classList.contains('item__image')) return;
    
    createImagePopup(target);
}