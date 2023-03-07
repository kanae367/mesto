const body = document.querySelector('body');
const pageTitle = document.querySelector('title');
const ul = document.querySelector('.photos__list');
const profileName = document.querySelector('.info__name');
const otherInfo = document.querySelector('.info__text');
const changeInfoBtn = document.querySelector('.change-info-btn');
const changeAvatarBtn = document.querySelector('.profile__photo-container');
const addCardBtn = document.querySelector('.add-photo-btn');
const avatar = document.querySelector('.profile__photo');
const cardTemplate = document.querySelector('#card');
const confirmPopupTemplate = document.querySelector('#confirm-popup');
const bigImageTemplate = document.querySelector('#big-image');

const alerts = document.querySelectorAll('.validation-message'); 
const popups = document.querySelectorAll('.menu-container');
const inputs = document.querySelectorAll('.menu__input');

const changeInformationPopup = popups[0];
const profileNameInput = inputs[0];
const profileOtherInfoInput = inputs[1];

const createCardPopup = popups[1];
const cardNameInput = inputs[2];
const cardUrlInput = inputs[3];

const changeAvatarPopup = popups[2];
const avatarUrlInput = inputs[4];

function createCard(cardName, imageLink){
    const clone = cardTemplate.content.cloneNode(true);
    const image = clone.querySelector('.item__image');
    const header  = clone.querySelector('.item__header');
    image.alt = cardName;
    image.src = imageLink;
    if(cardName.length > 13) cardName = cardName.substring(0, 10) + '...';
    header.textContent = cardName;

    ul.prepend(clone);
}

for(let card of savedCards){
    if(card.name.length > 0 ){
        createCard(card.name, card.link);
    }
}

ul.addEventListener('click', function(evt){
    const target = evt.target;
    if(!target.classList.contains('like-btn')) return;

    target.classList.toggle('like-btn_pressed');
})

const createImagePopup = function(image) {
    const clone = bigImageTemplate.content.cloneNode(true);
    const popupImage = clone.querySelector('.menu-container');
    const fullImage = popupImage.querySelector('.full-image');
    const imageCaption = popupImage.querySelector('span');
    popupImage.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    fullImage.alt = image.alt;
    fullImage.src = image.src;
    imageCaption.textContent = fullImage.alt;
    body.append(popupImage);

    setTimeout(() => {
            popupImage.classList.add('active');
    }, 10);

    popupImage.addEventListener('click', function(evt){
        const target = evt.target;
        if(target.classList.contains('close-button')) setTimeout(() => popupImage.remove(), 300);
        if(target != popupImage) return;
        setTimeout(() => popupImage.remove(), 300)
    });
}

ul.addEventListener('click', function(evt){
    const target = evt.target;
    if(!target.classList.contains('item__image')) return;

    createImagePopup(target);
});

const setInputValue = function(){
    profileNameInput.value = profileName.textContent;
    profileOtherInfoInput.value = otherInfo.textContent;
}

const updateInfo = function(){
    pageTitle.innerHTML = profileNameInput.value;
    profileName.textContent = profileNameInput.value;
    otherInfo.textContent = profileOtherInfoInput.value;
}

changeInfoBtn.addEventListener('click', function(){
    setInputValue();
    changeInformationPopup.classList.add('active');
});

infoForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    updateInfo();
});

const addNewCard = function(){
    createCard(cardNameInput.value, cardUrlInput.value);
    cardNameInput.value = '';
    cardUrlInput.value = '';
}

addCardBtn.addEventListener('click', () => createCardPopup.classList.add('active'));

cardForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    addNewCard();
});

const changeAvatar = function(){
    avatar.src = avatarUrlInput.value;
    avatarUrlInput.value = '';
}

changeAvatarBtn.addEventListener('click', () => changeAvatarPopup.classList.add('active'));

avatarForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    changeAvatar();
});

const createConfirmPopup = function(element){
    const confirmPopup = confirmPopupTemplate.content.cloneNode(true);
    const confirmPopupBtn = confirmPopup.querySelector('.submit-button');
    const closeBtn = confirmPopup.querySelector('.close-button');
    confirmPopupBtn.style.marginTop = '0';
    body.append(confirmPopup);
    
    setTimeout(() => {
        closeBtn.closest('.menu-container').classList.add('active');
    }, 50);

    confirmPopupBtn.addEventListener('click', function(){
        element.closest('li').remove();
        this.closest('.menu-container').remove();
    })

    closeBtn.addEventListener('click', function(){
        closeBtn.closest('.menu-container').remove();
    });
};

document.addEventListener('click', function(evt){
    const target = evt.target;
    if(!target.classList.contains('delete-item')) return;

    createConfirmPopup(target);
});

const resetPopups = function(element){
    element.closest('.menu-container').classList.remove('active');
    for(const alert of alerts) alert.classList.remove('active');
    for(const btn of document.querySelectorAll('.submit-button')) btn.disabled = 'true';
    setTimeout(() => {
        for(const input of inputs){
            input.style.borderBottom = '';
            input.value = '';
        }
    }, 300);
}

document.addEventListener('mousedown', function(evt){
    const target = evt.target;

    if(target.classList.contains('close-button') || target.classList.contains('menu-container')){
        resetPopups(target);
    }
});


const validateInputs = function(input){
    if(input.required){
        const alertMessage = input.closest('.menu__input-container').querySelector('.validation-message');

        if(input.checkValidity() === false){
            const validity = input.validity;

            if(validity.valueMissing){
                alertMessage.textContent = 'Вы пропустили это поле.';
            }else if(validity.patternMismatch){
                alertMessage.textContent = 'Введите адрес сайта.'
            }

                alertMessage.classList.add('active');
                input.style.borderBottom = '1px solid red'
            }else{
                alertMessage.classList.remove('active');
                input.style.borderBottom = '';
        }
    }else{
        return;
    }
}

const validateForm = function(form){
    const submitBtn = form.querySelector('.submit-button');

    if(form.checkValidity() === true){
        submitBtn.disabled = '';
    }else{
        submitBtn.disabled = 'true';
    }
}

const hidePopup = function(){
    this.closest('.menu-container').classList.remove('active');
}

const forms = document.querySelectorAll('.menu__form');

forms.forEach(function(form){
    form.addEventListener('input', function(evt){
        const target = evt.target;
        validateInputs(target);
        validateForm(form);
    });

    form.addEventListener('submit', hidePopup);
});