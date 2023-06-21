const cardTemplate = document.querySelector('#card');
const ul = document.querySelector('.photos__list');

export function createCard(cardName, imageLink, id, isLiked = false){
    const clone = cardTemplate.content.cloneNode(true);
    const image = clone.querySelector('.item__image');
    const header  = clone.querySelector('.item__header');
    const item = clone.querySelector('.photos__list-item');
    if(isLiked) clone.querySelector('.like-btn').classList.add('like-btn_pressed')
    item.setAttribute('data-id', id);
    image.alt = cardName;
    image.src = imageLink;
    setTimeout(() => {
        if(image.height < 50){
            image.src = 'images/image-placeholder.png';
        }
    }, 1000)
    header.textContent = cardName;

    ul.prepend(clone);
}