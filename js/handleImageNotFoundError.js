export function handleImageNotFoundError(type='card'){
    const errorPopupElement = document.querySelector('.error-popup');
    const errorTextElement = errorPopupElement.querySelector('p');
    errorTextElement.textContent = `Ошибка при ${type === 'avatar' ? 'изменении фотографии профиля' : 'добавлении карточки в базу данных'}. Ссылка должна вести к изображению.`
    errorPopupElement.classList.add('active');
    const timeout = setTimeout(() => {
        clearTimeout(timeout);
        errorPopupElement.classList.remove('active');
    }, 5000);
}