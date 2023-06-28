const errorPopupElement = document.querySelector('.error-popup');
const errorTextElement = errorPopupElement.querySelector('p');

export function handleImageNotFoundError(type='card'){
    errorTextElement.textContent = `Ошибка при ${type === 'avatar' ? 'изменении фотографии профиля' : 'добавлении карточки в базу данных'}. Ссылка должна вести к изображению.`
    errorPopupElement.classList.add('active');
    
    setTimeout(() => {
        errorPopupElement.classList.remove('active');
    }, 5000);
}