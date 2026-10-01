const chestsEl = document.getElementById("chests");
const reveal = document.getElementById("reveal");

CHESTS.forEach(chest => {
  const btn = document.createElement("button");
  btn.className = "chest";
  btn.innerHTML = `<span class="icon">🎁</span>${chest.title}`;
  btn.addEventListener("click", () => {
    btn.classList.add("opened");
    btn.querySelector(".icon").textContent = "✨";
    reveal.innerHTML = `<strong>🎵 ${chest.song}</strong><br>${chest.text}`;
    if (chest.link) {
      reveal.innerHTML += `<br><a class="link" href="${chest.link}" target="_blank">Listen</a>`;
    }
  });
  chestsEl.appendChild(btn);
});