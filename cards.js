const deck = document.getElementById("deck");
const seen = new Set();       // which cards have been flipped at least once
let surpriseDone = false;

CARDS.forEach((card, index) => {
  const btn = document.createElement("button");
  btn.className = "flipcard";
  const front = `<span class="elixir">${card.elixir}</span>${card.name}`;
  btn.innerHTML = front;
  btn.addEventListener("click", () => {
    const flipped = btn.classList.toggle("flipped");
    playSound("flip");
    btn.innerHTML = flipped ? card.reason : front;

    seen.add(index);
    if (!surpriseDone && seen.size === CARDS.length) {
      surpriseDone = true;
      setTimeout(showSurprise, 700);
    }
  });
  deck.appendChild(btn);
});

// An image slides in slowly from the left, waits a moment, then twirls away
function showSurprise() {
  if (typeof CARDS_SURPRISE === "undefined" || !CARDS_SURPRISE) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const img = document.createElement("img");
  img.className = "surprise";
  img.alt = "";
  img.onerror = () => img.remove();   // no file yet: nothing happens
  img.src = CARDS_SURPRISE;
  document.body.appendChild(img);
  if (!img.animate) { img.remove(); return; }

  playSound("chest");
  const anim = img.animate([
    { transform: "translate(calc(-50% - 100vw), -50%) rotate(0deg) scale(1)", opacity: 1, offset: 0, easing: "ease-out" },
    { transform: "translate(-50%, -50%) rotate(0deg) scale(1)", opacity: 1, offset: 0.5 },
    { transform: "translate(-50%, -50%) rotate(0deg) scale(1)", opacity: 1, offset: 0.7, easing: "ease-in" },
    { transform: "translate(-50%, -50%) rotate(720deg) scale(0)", opacity: 0, offset: 1 },
  ], { duration: 6500, fill: "forwards" });
  anim.onfinish = () => img.remove();
}