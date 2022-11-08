export const initDonateInputs = (instance, text, range, procent) => {
  const price = instance.dataset.price;
  const min = Math.round((price * 15) / 100); //15% от цены
  const max = Math.round((price * 90) / 100); //90% от цены
  range.min = min;
  range.max = max;
  procent.innerText = getPercent(min, price);

  text.addEventListener('input', () => {
    text.value = text.value.replace(/[^0-9]/g, '');
  });
};

export const initPeriodInputs = (text, range) => {
  const min = 1;
  const max = 30;
  range.min = min;
  range.max = max;

  text.addEventListener('input', () => {
    text.value = text.value.replace(/[^0-9]/g, '');
  });
};

export const getPercent = (value, price) => {
  value = parseInt(value);
  return Math.round((value * 100) / price) + '%';
};

export const ageToStr = age => {
  let txt;
  let count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = 'лет';
  } else {
    count = count % 10;
    if (count === 1) {
      txt = 'год';
    } else if (count >= 2 && count <= 4) {
      txt = 'года';
    } else {
      txt = 'лет';
    }
  }
  return ` ${txt}`;
};
