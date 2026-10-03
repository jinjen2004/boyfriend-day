const photosEl = document.getElementById("photos");

// Photos with hover text (tap on a phone, since phones have no hover)
US_PHOTOS.forEach(p => {
  const fig = document.createElement("figure");
  fig.className = "photo";
  fig.innerHTML =
    `<img src="${p.src}" alt="${p.caption}" loading="lazy" decoding="async">` +
    `<figcaption>${p.caption}</figcaption>`;
  fig.addEventListener("click", () => fig.classList.toggle("show"));
  photosEl.appendChild(fig);
});

// The "honorable mention" popup on the side, with its caption always showing
if (typeof HONORABLE !== "undefined" && HONORABLE && HONORABLE.src) {
  const card = document.createElement("aside");
  card.className = "honorable";
  card.innerHTML =
    `<button class="hm-close" aria-label="Close">×</button>` +
    `<div class="hm-title">🏅 Honorable mention</div>` +
    `<img src="${HONORABLE.src}" alt="" decoding="async" onerror="this.closest('.honorable').remove()">` +
    `<p>${HONORABLE.caption}</p>`;
  card.querySelector(".hm-close").addEventListener("click", () => {
    playSound("tap");
    card.classList.add("leave");
    setTimeout(() => card.remove(), 400);
  });
  setTimeout(() => {
    document.body.appendChild(card);
    playSound("match");
  }, 1500);
}