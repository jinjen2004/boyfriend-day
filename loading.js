const fill = document.getElementById("bar-fill");
const tipEl = document.getElementById("tip");
let progress = 0;
let tipIndex = 0;
tipEl.textContent = TIPS[tipIndex];

const tipTimer = setInterval(() => {
  tipIndex = (tipIndex + 1) % TIPS.length;
  tipEl.textContent = TIPS[tipIndex];
}, 2500);

const barTimer = setInterval(() => {
  progress += Math.random() * 1.5 + 0.5;
  if (progress >= 100) {
    progress = 100;
    clearInterval(barTimer);
    clearInterval(tipTimer);
    setTimeout(() => { window.location.href = "home.html"; }, 400);
  }
  fill.style.width = progress + "%";
}, 100);