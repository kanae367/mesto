const inputs = cardForm.querySelectorAll('input');
const cardNameInput = inputs[0];
const cardUrlInput = inputs[1];

export function clearInputs(){
    cardNameInput.value = '';
    cardUrlInput.value = '';
}