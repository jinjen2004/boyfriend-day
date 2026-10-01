const deck = document.getElementById("deck");

CARDS.forEach(card => {
  const btn = document.createElement("button");
  btn.className = "flipcard";
  const front = `<span class="elixir">${card.elixir}</span>${card.name}`;
  btn.innerHTML = front;
  btn.addEventListener("click", () => {
    const flipped = btn.classList.toggle("flipped");
    playSound("flip");
    btn.innerHTML = flipped ? card.reason : front;
  });
  deck.appendChild(btn);
});