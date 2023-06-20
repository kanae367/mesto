const cardTemplate = document.querySelector('#card');
const ul = document.querySelector('.photos__list');

export function createCard(cardName, imageLink, id){
    const clone = cardTemplate.content.cloneNode(true);
    const image = clone.querySelector('.item__image');
    const header  = clone.querySelector('.item__header');
    const item = clone.querySelector('.photos__list-item');
    item.setAttribute('data-id', id);
    image.alt = cardName;
    image.src = imageLink;
    if(cardName.length > 13) cardName = cardName.substring(0, 10) + '...';
    header.textContent = cardName;

    ul.prepend(clone);
}