const validateInputs = function(input){
    if(!input.required) return;

    const alertMessage = input.closest('.menu__input-container').querySelector('.validation-message');

    if(input.checkValidity() === false){
        const validity = input.validity;

        if(validity.valueMissing){
            alertMessage.textContent = 'Вы пропустили это поле.';
        }else if(validity.patternMismatch){
            alertMessage.textContent = 'Введите адрес сайта.'
        }else if(validity.tooShort){
            alertMessage.textContent = 'Минимальная длина - 3 символа'
        }

        alertMessage.classList.add('active');
        input.style.borderBottom = '1px solid red'
    }else{
        alertMessage.classList.remove('active');
        input.style.borderBottom = '';
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
    const submitBtn = this.querySelector('.submit-button');
    submitBtn.disabled = 'true';
}

export function setValidation(form){
    form.addEventListener('input', function(evt){
        const target = evt.target;
        validateInputs(target);
        validateForm(form);
    });

    form.addEventListener('submit', hidePopup);
}
