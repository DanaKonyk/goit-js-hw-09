import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const startBtn = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

let timerId;
let choosenDate;

flatpickr (
    input, {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            if (selectedDates[0] <= Date.now()) {
                Notiflix.Notify.failure('Please choose a date in the future');
                startBtn.disabled = true;
            } else {
                startBtn.disabled = false;
                choosenDate = selectedDates[0];
            }
        }
    }
);

function timerCounter () {
    const currentDate = Date.now();
    const timeDifference = choosenDate - currentDate;

    if (timeDifference < 0) {
        clearInterval(timerId);
        return
    }

  const { days: d, hours: h, minutes: m, seconds: s } = convertMs(timeDifference);

  days.textContent = addLeadingZero(d);
  hours.textContent = addLeadingZero(h);
  minutes.textContent = addLeadingZero(m);
  seconds.textContent = addLeadingZero(s);
};


startBtn.addEventListener('click', () => {
    if (choosenDate) {
        timerId = setInterval(timerCounter, 1000);
        timerCounter();
    }
});


function addLeadingZero(value){
    return String(value).padStart(2, '0');
}


function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}