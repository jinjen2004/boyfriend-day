// The wow sound plays when the puzzle is solved
const wowSound = new Audio("audio/wow.mp3");
wowSound.preload = "auto";
wowSound.volume = 0.8;
function playWow() {
  if (isMuted()) return;
  wowSound.currentTime = 0;
  wowSound.play().catch(() => playSound("win"));   // missing file: use the fanfare instead
}

const board = document.getElementById("board");
const statusBox = document.getElementById("statusbox");
const letterEl = document.getElementById("letter");

// two of each emoji, shuffled
const symbols = [...MATCH_CARDS, ...MATCH_CARDS].sort(() => Math.random() - 0.5);

let first = null;     // the first tile flipped in a turn
let locked = false;   // true while a wrong pair is showing
let matched = 0;
let moves = 0;

symbols.forEach(symbol => {
  const tile = document.createElement("button");
  tile.className = "tile";
  tile.dataset.symbol = symbol;
  tile.textContent = "?";
  tile.addEventListener("click", () => flip(tile));
  board.appendChild(tile);
});

function flip(tile) {
  if (locked || tile.classList.contains("up")) return;
  tile.classList.add("up");
  playSound("flip");
  tile.innerHTML = symbolHtml(tile.dataset.symbol);

  if (!first) { first = tile; return; }

  moves++;
  statusBox.textContent = "Moves: " + moves;

  if (first.dataset.symbol === tile.dataset.symbol) {
    first.classList.add("done");
    tile.classList.add("done");
    first = null;
    matched++;
    if (matched === MATCH_CARDS.length) win(); else playSound("match");
  } else {
    locked = true;
    playSound("wrong");
    const a = first;
    first = null;
    setTimeout(() => {
      [a, tile].forEach(t => { t.classList.remove("up"); t.textContent = "?"; });
      locked = false;
    }, 800);
  }
}

function win() {
  playWow();
  launchFireworks(4000);
  Music.pauseFor("win", 4000);
  statusBox.textContent = "👑 Victory in " + moves + " moves! Your letter:";
  letterEl.innerHTML = LETTER.map(p => "<p>" + p + "</p>").join("");
}