import Inputmask from 'inputmask';

const checkbox = document.querySelector('.checkmark');
const nameMsg = document.getElementById('name_error');
const phoneMsg = document.getElementById('phone_error');

export const validInputs = (inpName, inpNumber, inpCheck, flag) => {
  Inputmask({'mask': '+7 (999) 999 99 99'}).mask(inpNumber);
  if (flag) {
    inpName.classList.remove('invalid');
    inpNumber.classList.remove('invalid');
    checkbox.classList.remove('invalid');
    nameMsg.classList.remove('visible');
    phoneMsg.classList.remove('visible');
  } else {
    if (!inpName.value) {
      inpName.classList.add('invalid');
      nameMsg.classList.add('visible');
    }
    if (!inpNumber.value || inpNumber.value.indexOf('_') !== -1) {
      inpNumber.classList.add('invalid');
      phoneMsg.classList.add('visible');
    }
    if (!inpCheck.checked) {
      checkbox.classList.add('invalid');
    }
  }
  invalidListener();
};

const invalidListener = () => {
  document.querySelectorAll('.invalid').forEach(elem => {
    elem.addEventListener('click', function () {
      this.classList.remove('invalid');
      nameMsg.classList.remove('visible');
      phoneMsg.classList.remove('visible');
    });
  });
};
