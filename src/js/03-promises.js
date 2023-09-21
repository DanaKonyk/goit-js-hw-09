import Notiflix from "notiflix";

const form = document.querySelector(".form");

form.addEventListener('submit', onFormSubmit);


function onFormSubmit(evt) {
    evt.preventDefault();
  
  const delay = parseInt(evt.currentTarget.elements.delay.value);
  const step = parseInt(evt.currentTarget.elements.step.value);
  const amount = parseInt(evt.currentTarget.elements.amount.value);

  for (let i = 0; i < amount; i+=1) {

    const position = i + 1;
    const delays = delay + step * i;


  createPromise(position, delays)
  .then(({ position, delay }) => {
     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
  
  evt.currentTarget.reset();
}


function createPromise(position, delay) {
  return new Promise ((resolve, reject) => { 
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
  } else {
        reject({ position, delay });
  }
  }, delay);

});

};

