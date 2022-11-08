import * as help from './price-helper.js';

const getId = document.getElementById.bind(document);

const priceModal = getId('price_modal'),
  pricePopupForm = getId('price_form'),
  pricePopupBack = getId('confirm_form'),
  priceCrossBack = getId('cross_back'),
  inpName = getId('inp_name'),
  inpPhone = getId('inp_number'),
  inpConfirm = getId('inp_confirm');

const clearPriceModal = () => {
  help.validInputs(inpName, inpPhone, inpConfirm, true);
  inpName.value = '';
  inpPhone.value = '';
  inpConfirm.checked = false;
};

export const openPriceModal = () => {
  clearPriceModal();
  priceModal.classList.add('open');
  pricePopupForm.classList.add('open');
};

export const closePriceModals = () => {
  clearPriceModal();
  priceModal.classList.remove('open');
  pricePopupForm.classList.remove('open');
  pricePopupBack.classList.remove('open');
  priceCrossBack.classList.remove('visible');
};

export const confirmPrice = () => {
  if (inpName.value && inpPhone.value && inpConfirm.checked && inpPhone.value.indexOf('_') === -1) {
    help.validInputs(inpName, inpPhone, inpConfirm, true);
    pricePopupForm.classList.remove('open');
    pricePopupBack.classList.add('open');
    priceCrossBack.classList.add('visible');
  } else {
    help.validInputs(inpName, inpPhone, inpConfirm, false);
  }
};
