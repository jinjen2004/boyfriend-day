document.querySelectorAll(".his-name").forEach(el => el.textContent = HIS_NAME);

const topbar = document.getElementById("topbar");
if (topbar) {
  topbar.innerHTML =
    `<a href="home.html">👑 ${HIS_NAME}</a><a class="profile-btn" href="profile.html">Profile</a>`;
}

const tabbar = document.getElementById("tabbar");
if (tabbar) {
  const tabs = [
    ["chests", "🎁", "Chests"],
    ["cards", "🃏", "Cards"],
    ["battle", "⚔️", "Battle"],
    ["us", "💙", "Us"],
  ];
  const current = document.body.dataset.tab;
  tabbar.innerHTML = tabs
    .map(([id, icon, label]) =>
      `<a href="${id}.html" class="${id === current ? "active" : ""}">${icon}<span>${label}</span></a>`)
    .join("");
}