import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form'),
  fisrtDelay = document.querySelector('[name="delay"]'),
  delayStep = document.querySelector('[name="step"]'),
  amount = document.querySelector('[name="amount"]'),
  btnCreate = document.querySelector('button');
let promise,
  intervalCreate = null,
  delayStepValue = 0,
  cont = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
  createPromise(parseInt(amount.value), parseInt(fisrtDelay.value));
});

function createPromise(position, delay) {
  delayStepValue = parseInt(delayStep.value);
  (intervalCreate = setTimeout(() => {
    timeout(position, delay);
  }, delay)),
    setInterval(() => {
      timeout(position, delay);
    }, delayStepValue);
}

function timeout(position, delay) {
  delayStepValue = parseInt(delayStep.value);
  if (cont < position) {
    const shouldResolve = Math.random() > 0.3;
    promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve('valor'); // Pasa el valor deseado a la función resolve()
      } else {
        reject('error'); // Pasa la razón del rechazo a la función reject()
      }
    });
    promise
      .then(value => {
        Notify.success(
          `✅ Fulfilled promise ${cont + 1} in ${
            delay + delayStepValue * cont
          }ms`,
          {
            useIcon: false,
            timeout: delay + delayStepValue * position,
          }
        );
        cont += 1;
      })
      .catch(error => {
        Notify.failure(
          `❌ Rejected promise ${cont + 1} in ${
            delay + delayStepValue * cont
          }ms`,
          {
            useIcon: false,
            timeout: delay + delayStepValue * position,
          }
        );
        cont += 1;
      });
  } else {
    clearInterval(intervalCreate);
  }
}
