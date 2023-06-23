export function clearInputs(){
    const inputs = cardForm.querySelectorAll('input');
    const cardNameInput = inputs[0];
    const cardUrlInput = inputs[1];

    cardNameInput.value = '';
    cardUrlInput.value = '';
}