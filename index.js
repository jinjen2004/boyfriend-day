// OPEN swirls away, then we go to the loading page
const openBtn = document.querySelector(".gold-btn");

openBtn.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();   // we handle the page change ourselves
  playSound("chest");
  document.querySelector(".screen").classList.add("leaving-swirl");
  openBtn.classList.add("swirl");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  setTimeout(() => { window.location.href = "loading.html"; }, reduce ? 0 : 1000);
});

// "Wow" sound every time the start page opens
if (!isMuted()) {
  const wow = new Audio("audio/wow.mp3");   // keep this clip short
  wow.volume = 0.8;

  Music.block("wow");                       // music waits until the wow is over
  const release = () => Music.unblock("wow");
  wow.addEventListener("ended", release);
  wow.addEventListener("error", release);   // missing file: don't hold the music back
  wow.addEventListener("playing", () => setTimeout(release, 4000));   // safety net

  // Browsers usually block sound before a tap, so fall back to the first tap
  wow.play().catch(() => {
    document.addEventListener("pointerdown", () => {
      wow.play().catch(release);
    }, { once: true });
  });
}