// Shows your image if you set one in ICONS, otherwise the emoji
function icon(key, fallback) {
  const src = ICONS[key];
  if (!src) return fallback;
  return `<img class="icon-img" src="${src}" alt="" onerror="this.replaceWith('${fallback}')">`;
}

// For memory-game tiles: an image path becomes <img>, anything else stays text
function symbolHtml(s) {
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(s) ? `<img class="icon-img" src="${s}" alt="">` : s;
}

document.querySelectorAll(".his-name").forEach(el => el.textContent = HIS_NAME);

const crownEl = document.querySelector(".crown");
if (crownEl) crownEl.innerHTML = icon("crown", "👑");

const topbar = document.getElementById("topbar");
if (topbar) {
  topbar.innerHTML =
    `<a class="home-btn" href="home.html" aria-label="Home" title="Home">${icon("crown", "👑")}</a>` +
    `<span class="top-actions">` +
    `<button class="sound-btn" id="sound-btn" aria-label="Toggle sound">${isMuted() ? "🔇" : "🔊"}</button>` +
    `<a class="profile-btn" href="profile.html">Profile</a></span>`;

  document.getElementById("sound-btn").addEventListener("click", e => {
    setMuted(!isMuted());
    e.currentTarget.textContent = isMuted() ? "🔇" : "🔊";
    document.dispatchEvent(new Event("soundchange"));
    playSound("tap");
  });
}

const tabbar = document.getElementById("tabbar");
if (tabbar) {
  const tabs = [
    ["chests", "tabChests", "🎁", "Chests"],
    ["cards", "tabCards", "🃏", "Cards"],
    ["battle", "tabBattle", "⚔️", "Battle"],
    ["us", "tabUs", "💙", "Us"],
  ];
  const current = document.body.dataset.tab;
  tabbar.innerHTML = tabs
    .map(([id, key, emoji, label]) =>
      `<a href="${id}.html" class="${id === current ? "active" : ""}">${icon(key, emoji)}<span>${label}</span></a>`)
    .join("");
}

// Tap sound for links and big buttons (page scripts play their own sounds)
document.addEventListener("click", e => {
  if (e.target.closest(".tabbar a, .home-btn, .profile-btn, .gold-btn, .link, .menu-tile")) playSound("tap");
});

// Fallback for browsers without page transitions: fade out, then go
if (!(window.CSS && CSS.supports("view-transition-name", "a"))) {
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.origin !== location.origin) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => { window.location.href = a.href; }, 150);
  });
  window.addEventListener("pageshow", () => document.body.classList.remove("leaving"));
}