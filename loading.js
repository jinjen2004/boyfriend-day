// Safety net: never get stuck on this page
setTimeout(() => { window.location.href = "home.html"; }, 15000);

const MAX_TOTAL_MS = 6000;   // aim for about 6 seconds in total
const TIP_MS = Math.max(1200, Math.min(1800, MAX_TOTAL_MS / TIPS.length));
const TOTAL_MS = TIPS.length * TIP_MS;   // every tip still shows once

const fill = document.getElementById("bar-fill");
const tipEl = document.getElementById("tip");
const start = performance.now();
let currentTip = -1;

function frame(now) {
  const elapsed = now - start;
  const i = Math.min(Math.floor(elapsed / TIP_MS), TIPS.length - 1);
  if (i !== currentTip) {
    currentTip = i;
    tipEl.textContent = TIPS[i];
  }
  const progress = Math.min(elapsed / TOTAL_MS, 1);
  fill.style.transform = "scaleX(" + progress + ")";

  if (progress < 1) {
    requestAnimationFrame(frame);
  } else {
    setTimeout(() => { window.location.href = "home.html"; }, 300);
  }
}
requestAnimationFrame(frame);