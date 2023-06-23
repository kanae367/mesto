const inputs = cardForm.querySelectorAll('input');

export function clearInputs(){
    const cardNameInput = inputs[0];
    const cardUrlInput = inputs[1];

    cardNameInput.value = '';
    cardUrlInput.value = '';
}