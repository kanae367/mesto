function closePopupImage(evt){
    const target = evt.target;
    if(target === this) setTimeout(() => this.remove(), 300)
}

const bigImageTemplate = document.querySelector('#big-image');

export function createImagePopup(image) {
    const clone = bigImageTemplate.content.cloneNode(true);
    const popupImage = clone.querySelector('.menu-container');
    const fullImage = popupImage.querySelector('.full-image');
    const imageCaption = popupImage.querySelector('span');
    popupImage.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    fullImage.alt = image.alt;
    fullImage.src = image.src;
    imageCaption.textContent = fullImage.alt;
    document.body.append(popupImage);

    setTimeout(() => {
        popupImage.classList.add('active');
    }, 10);

    popupImage.addEventListener('click', closePopupImage);
}