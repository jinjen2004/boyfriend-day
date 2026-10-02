const chestsEl = document.getElementById("chests");
const reveal = document.getElementById("reveal");

const opened = new Set();
let celebrated = false;
let player = null;         // the YouTube player for the open chest
let heartTimer = null;
let resumeTimer = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// "Opened 0 / 3" counter under the chests
const progress = document.createElement("p");
progress.className = "progress";
chestsEl.after(progress);
function updateProgress() {
  progress.textContent = opened.size === CHESTS.length
    ? "All " + CHESTS.length + " songs unlocked 🎉"
    : "Opened " + opened.size + " / " + CHESTS.length;
}
updateProgress();

// Accepts a full YouTube link or just the 11-character video id
function videoId(v) {
  if (!v) return "";
  const m = v.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(v.trim()) ? v.trim() : "";
}

// Load YouTube's player code once
let apiPromise = null;
function loadYouTubeApi() {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise(resolve => {
    if (window.YT && window.YT.Player) return resolve();
    window.onYouTubeIframeAPIReady = () => resolve();
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.onerror = () => resolve();   // offline: we show a link instead
    document.head.appendChild(s);
  });
  return apiPromise;
}

// Cute extras while a song plays: a spinning record, bars and floating hearts
function spawnHeart() {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = ["💙", "💛", "🎵", "✨"][Math.floor(Math.random() * 4)];
  h.style.left = (5 + Math.random() * 85) + "%";
  h.addEventListener("animationend", () => h.remove());
  reveal.appendChild(h);
}
function setPlaying(on) {
  reveal.classList.toggle("playing", on);
  clearInterval(heartTimer);
  if (on && !reduceMotion) heartTimer = setInterval(spawnHeart, 700);
}

// Pause the background music while the video plays, bring it back after
function onStateChange(e) {
  const S = window.YT.PlayerState;
  if (e.data === S.PLAYING) {
    clearTimeout(resumeTimer);
    Music.block("song");
    setPlaying(true);
  } else if (e.data === S.PAUSED || e.data === S.ENDED) {
    setPlaying(false);
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => Music.unblock("song"), 1500);   // short pauses don't restart the music
  }
}

function stopPlayer() {
  clearTimeout(resumeTimer);
  try { if (player && player.destroy) player.destroy(); } catch (e) {}
  player = null;
  setPlaying(false);
  Music.unblock("song");
}

function showSong(chest) {
  stopPlayer();
  const id = videoId(chest.video);
  const search = "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(chest.song + " " + (chest.artist || ""));
  const watch = id ? "https://www.youtube.com/watch?v=" + id : search;

  reveal.innerHTML =
    `<div class="song-head"><span class="disc">💿</span>` +
    `<div><strong class="song-title">${chest.song}</strong>` +
    (chest.artist ? `<div class="song-artist">${chest.artist}</div>` : "") +
    `</div><span class="eq"><i></i><i></i><i></i></span></div>` +
    `<p class="song-note">${chest.text}</p>` +
    // A thumbnail with a play button; the real video loads when it's tapped
    (id ? `<div class="player-wrap"><div id="yt-player"></div>` +
          `<button class="play-overlay" id="play-overlay" aria-label="Play ${chest.song}" ` +
          `style="background-image:url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')"><span>▶</span></button></div>` : "") +
    `<a class="link" id="yt-link" target="_blank" rel="noopener" href="${watch}">` +
    (id ? "Open on YouTube" : "Find it on YouTube ›") + `</a>`;

  if (!id) return;
  loadYouTubeApi();   // start loading now so the video is ready when he taps play
  document.getElementById("play-overlay").addEventListener("click", () => startPlayer(id, watch));
}

function startPlayer(id, watch) {
  const overlay = document.getElementById("play-overlay");
  loadYouTubeApi().then(() => {
    if (!(window.YT && window.YT.Player)) {   // couldn't load: open YouTube instead
      window.open(watch, "_blank");
      return;
    }
    overlay.classList.add("hide");
    player = new window.YT.Player("yt-player", {
      videoId: id,
      host: "https://www.youtube-nocookie.com",
      playerVars: { playsinline: 1, rel: 0, modestbranding: 1, autoplay: 1 },
      events: {
        onReady: e => e.target.playVideo(),
        onStateChange,
        onError: () => {
          document.getElementById("yt-link").textContent = "This video can't play here. Watch on YouTube ›";
        },
      },
    });
  });
}

CHESTS.forEach((chest, index) => {
  const btn = document.createElement("button");
  btn.className = "chest";
  btn.innerHTML = `<span class="icon">${icon("chest", "🎁")}</span>${chest.title}`;
  btn.addEventListener("click", () => {
    btn.classList.add("opened");
    playSound("chest");
    Music.pauseFor("chest", 1500);
    btn.querySelector(".icon").innerHTML = icon("chestOpen", "✨");
    opened.add(index);
    showSong(chest);
    updateProgress();
    if (opened.size === CHESTS.length && !celebrated) {
      celebrated = true;
      launchFireworks(2500);
    }
  });
  chestsEl.appendChild(btn);
});