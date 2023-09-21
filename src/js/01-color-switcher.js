

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");
let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColor() {
    body.style.backgroundColor = getRandomHexColor();    
}



startBtn.addEventListener('click', () => { 
    startBtn.disabled = true;
    timerId = setInterval(changeColor, 1000);
});

stopBtn.addEventListener('click', () => { 
    startBtn.disabled = false;
    clearInterval(timerId);
});