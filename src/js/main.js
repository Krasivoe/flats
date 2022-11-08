import * as credit from './credit-helper.js';
import * as price from './price-modal.js';

const getId = document.getElementById.bind(document);
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

//Модальные окна
const btnPrice = queryAll('.price'),
  priceModal = getId('price_modal'),
  btnPopupForm = getId('confirm_price'),
  btnPopupBack = getId('back'),
  priceCrossBack = getId('cross_back');

//Боковая панель
const btnCredit = queryAll('.credit'),
  creditModal = getId('aside_modal'),
  creditForm = getId('aside_form'),
  creditCross = getId('cross_credit'),
  inpDonateText = getId('inp_donate_text'),
  inpDonateRange = getId('inp_donate_range'),
  donatePercent = getId('donate_percent'),
  inpPeriodText = getId('inp_period_text'),
  inpPeriodRange = getId('inp_period_range'),
  formPayment = getId('credit_payment'),
  btnSuccess = getId('credit_success'),
  monthlyRate = 5.49 / 12 / 100; //Месячная ставка

//Видео
const btnVideo = queryAll('.btn-video'),
  videoContent = getId('video'),
  modalVideo = getId('video_modal');

let instance = '',
  creditPrice = '',
  creditMin = '',
  creditMax = '',
  paymentSum = '';

//Узнать цену
const initModalPrice = () => {
  btnPrice.forEach(item => {
    item.addEventListener('click', price.openPriceModal);
  });
  priceModal.addEventListener('click', e => {
    const priceModal = query('.price-form.open');
    if (priceModal && priceModal !== e.target && !priceModal.contains(e.target)) {
      price.closePriceModals();
    }
  });
  btnPopupForm.addEventListener('click', price.confirmPrice);
  btnPopupBack.addEventListener('click', price.closePriceModals);
  priceCrossBack.addEventListener('click', price.closePriceModals);
};
initModalPrice();

//Боковое меню
const initAside = () => {
  btnCredit.forEach(item => {
    item.addEventListener('click', function () {
      instance = this;
      creditPrice = this.dataset.price;
      creditMin = Math.round((creditPrice * 15) / 100); //15% от цены
      creditMax = Math.round((creditPrice * 90) / 100); //90% от цены
      credit.initDonateInputs(instance, inpDonateText, inpDonateRange, donatePercent);
      credit.initPeriodInputs(inpPeriodText, inpPeriodRange);
      formPayment.innerText = instance.innerText;

      if (parseInt(instance.dataset.donate) === 0 || parseInt(instance.dataset.period) === 0) {
        inpDonateText.value = creditMin + ' ₽';
        inpDonateRange.value = parseInt(inpDonateText.value);
        inpPeriodText.value = 30 + credit.ageToStr(30);
        inpPeriodRange.value = parseInt(inpPeriodText.value);
      } else {
        inpDonateText.value = instance.dataset.donate;
        inpDonateRange.value = parseInt(inpDonateText.value);
        inpPeriodText.value = instance.dataset.period;
        inpPeriodRange.value = parseInt(inpPeriodText.value);
        donatePercent.innerText = credit.getPercent(instance.dataset.donate, creditPrice);
      }

      creditModal.classList.add('open');
      creditForm.classList.add('open');
    });
  });

  //Взнос
  inpDonateText.addEventListener('change', function () {
    if (this.value < creditMin) this.value = creditMin;
    if (this.value > creditMax) this.value = creditMax;

    inpDonateRange.value = parseInt(this.value);
    donatePercent.innerText = credit.getPercent(this.value, creditPrice);
    creditCalculate();
  });
  inpDonateRange.addEventListener('input', function () {
    inpDonateText.value = this.value + ' ₽';
    donatePercent.innerText = credit.getPercent(this.value, creditPrice);
    creditCalculate();
  });

  //Срок
  inpPeriodText.addEventListener('change', function () {
    if (this.value < 1) this.value = 1;
    if (this.value > 30) this.value = 30;
    creditCalculate();
  });
  inpPeriodRange.addEventListener('input', function () {
    inpPeriodText.value = this.value + credit.ageToStr(this.value);
    creditCalculate();
  });

  //Закрыть
  creditCross.addEventListener('click', () => {
    creditModal.classList.remove('open');
    creditForm.classList.remove('open');
  });

  //Принять
  btnSuccess.addEventListener('click', () => {
    creditCalculate();
    instance.innerText = paymentSum;
    instance.dataset.donate = inpDonateText.value;
    instance.dataset.period = inpPeriodText.value;
    creditModal.classList.remove('open');
    creditForm.classList.remove('open');
  });
};

const creditCalculate = () => {
  if (inpDonateText.value && inpPeriodText.value) {
    const donate = parseInt(inpDonateText.value);
    const period = parseInt(inpPeriodText.value);

    const creditSum = creditPrice - donate; //Итоговая сумма кредита
    const countPayments = period * 12; //Количество месяцев
    const tmp = Math.pow(1 + monthlyRate, countPayments);
    const coef = (monthlyRate * tmp) / (tmp - 1); //Коэфицент
    let sum = Math.round(creditSum * coef);
    sum = new Intl.NumberFormat('ru-RU').format(sum);

    paymentSum = 'от ' + sum + ' ₽ / мес.';
    formPayment.innerText = paymentSum;
  }
};
initAside();

const initVideo = () => {
  btnVideo.forEach(item => {
    item.addEventListener('click', () => {
      videoContent.insertAdjacentHTML('beforeend', `
            <iframe 
            src="https://www.youtube.com/embed/58kZYl6R2-U" 
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
            </iframe>
            `);
      modalVideo.classList.add('open');
    });
  });
  modalVideo.addEventListener('click', e => {
    if (videoContent !== e.target && !videoContent.contains(e.target)) {
      modalVideo.classList.remove('open');
      videoContent.innerHTML = '';
    }
  });
};
initVideo();

(function () {
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      const confirmModal = getId('confirm_form');
      if (priceModal.classList.contains('open') || confirmModal.classList.contains('open')) {
        price.closePriceModals();
      }
    }
    if (modalVideo.classList.contains('open')) {
      modalVideo.classList.remove('open');
      videoContent.innerHTML = '';
    }
  });
  creditModal.addEventListener('click', e => {
    if (!creditForm.contains(e.target)) {
      creditModal.classList.remove('open');
      creditForm.classList.remove('open');
    }
  });
})();
