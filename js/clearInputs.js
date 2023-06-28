export function clearInputs(element){
    const inputs = element.querySelectorAll('.menu__input');

    inputs.forEach(input => {
        input.style.borderBottom = '';
        input.value = '';
    });
}