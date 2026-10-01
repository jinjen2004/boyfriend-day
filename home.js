// Player banner
document.getElementById("avatar").innerHTML = icon("crown", "👑");
const levelRow = PROFILE.find(row => row[0] === "Level");
document.getElementById("level").textContent = "Level " + (levelRow ? levelRow[1] : "??");

// Menu tiles
const MENU = [
  ["chests", "tabChests", "🎁", "Chests", "I think I hear something inside?"],
  ["cards", "tabCards", "🃏", "Cards", "Flip them, I dare you."],
  ["battle", "tabBattle", "⚔️", "Battle", "Noobs not allowed"],
  ["us", "tabUs", "💙", "Us", "Forbidden Reflection Magic"],
];
document.getElementById("menu").innerHTML = MENU
  .map(([id, key, emoji, label, note]) =>
    `<a class="menu-tile" href="${id}.html">` +
    `<span class="menu-icon">${icon(key, emoji)}</span>` +
    `<strong>${label}</strong><small>${note}</small></a>`)
  .join("");

// A random loading tip
document.getElementById("tipbox").textContent = TIPS[Math.floor(Math.random() * TIPS.length)];