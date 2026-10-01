// ===== EDIT THIS =====
const TIP_MS = 2200;   // how long each tip stays on screen (milliseconds)
// =====================

// The whole loading time grows with the number of tips, so every tip
// gets the same time and the bar always matches.
const TOTAL_MS = TIPS.length * TIP_MS;    // every tip shows at least once
const MEME_AT = TOTAL_MS * 0.4;           // the prank fires when the bar hits 50%
const MEME_MS = 1800;                     // how long the meme stays on screen
const RESTART_AT = MEME_AT + MEME_MS;     // the bar starts over here
const END_AT = TOTAL_MS + MEME_MS;        // the second run reaches 100% here

// Safety net: never get stuck on this page
setTimeout(() => { window.location.href = "home.html"; }, END_AT + 5000);

const fill = document.getElementById("bar-fill");
const bar = document.querySelector(".bar");
const tipEl = document.getElementById("tip");
const memeEl = document.getElementById("meme");
const start = performance.now();
let currentTip = -1;
let memeShown = false;

// Bar: 0 to 50%, snaps back to 0 during the meme, then fills 0 to 100%
function barProgress(elapsed) {
  if (elapsed < MEME_AT) return (elapsed / MEME_AT) * 0.5;
  if (elapsed < RESTART_AT) return 0;
  return Math.min((elapsed - RESTART_AT) / (END_AT - RESTART_AT), 1);
}

function showMeme() {
  memeEl.classList.add("show");
  bar.classList.add("shake");
  playSound("wrong");
  Music.pauseFor("meme", MEME_MS);   // the music goes quiet for a moment
  setTimeout(() => {
    memeEl.classList.remove("show");
    bar.classList.remove("shake");
  }, MEME_MS);
}

function frame(now) {
  const elapsed = now - start;

  // Tips keep going no matter what the bar does
  const i = Math.floor(elapsed / TIP_MS) % TIPS.length;
  if (i !== currentTip) {
    currentTip = i;
    tipEl.textContent = TIPS[i];
  }

  if (!memeShown && elapsed >= MEME_AT) {
    memeShown = true;
    showMeme();
  }

  fill.style.transform = "scaleX(" + barProgress(elapsed) + ")";

  if (elapsed < END_AT) {
    requestAnimationFrame(frame);
  } else {
    Music.fadeOut(500);   // the monkeys fade out, then the duck fades in on the next page
    setTimeout(() => { window.location.href = "home.html"; }, 550);
  }
}
requestAnimationFrame(frame);