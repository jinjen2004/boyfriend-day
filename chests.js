const chestsEl = document.getElementById("chests");
const reveal = document.getElementById("reveal");

CHESTS.forEach(chest => {
  const btn = document.createElement("button");
  btn.className = "chest";
  btn.innerHTML = `<span class="icon">${icon("chest", "🎁")}</span>${chest.title}`;
  btn.addEventListener("click", () => {
    btn.classList.add("opened");
    playSound("chest");
    Music.pauseFor("chest", 1500);
    btn.querySelector(".icon").innerHTML = icon("chestOpen", "✨");
    reveal.innerHTML = `<strong>🎵 ${chest.song}</strong><br>${chest.text}`;
    if (chest.link) {
      reveal.innerHTML += `<br><a class="link" href="${chest.link}" target="_blank">Listen</a>`;
    }
  });
  chestsEl.appendChild(btn);
});