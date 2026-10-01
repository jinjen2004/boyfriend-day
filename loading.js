const TIP_MS = 1800;                    // how long each tip stays up
const TOTAL_MS = TIPS.length * TIP_MS;  // every tip shows once, then we leave

const fill = document.getElementById("bar-fill");
const tipEl = document.getElementById("tip");
const start = Date.now();
let currentTip = -1;

const timer = setInterval(() => {
  const elapsed = Date.now() - start;
  const i = Math.min(Math.floor(elapsed / TIP_MS), TIPS.length - 1);
  if (i !== currentTip) {
    currentTip = i;
    tipEl.textContent = TIPS[i];
  }
  fill.style.width = Math.min((elapsed / TOTAL_MS) * 100, 100) + "%";
  if (elapsed >= TOTAL_MS) {
    clearInterval(timer);
    setTimeout(() => { window.location.href = "home.html"; }, 400);
  }
}, 50);