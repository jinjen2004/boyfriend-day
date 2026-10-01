// Background music. It plays only when nothing is "blocking" it.
const Music = (() => {
  // A page can pick its own song: <body data-music="audio/monkeys.mp3">
  // Pages without one play the main song.
  const TRACK = document.body.dataset.music || "audio/duck.mp3";
  const VOLUME = 0.25;
  const audio = new Audio(TRACK);
  audio.loop = true;
  audio.volume = VOLUME;

  // Storage can be blocked, so never let it crash the page
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  };

  const blockers = new Set();   // reasons the music is paused right now
  let started = store.get("bgmStarted") === "1";
  let broken = false;           // true if the file is missing
  let fadeTimer = null;

  // Smoothly change the volume
  function fadeTo(target, ms) {
    clearInterval(fadeTimer);
    const from = audio.volume;
    const t0 = performance.now();
    fadeTimer = setInterval(() => {
      const t = Math.min((performance.now() - t0) / ms, 1);
      audio.volume = from + (target - from) * t;
      if (t >= 1) clearInterval(fadeTimer);
    }, 50);
  }
  function fadeOut(ms) { fadeTo(0, ms); }

  // Pages reload on every tab change, so remember where the song was
  const prevTrack = store.get("bgmTrack");
  const sameTrack = prevTrack === TRACK;
  store.set("bgmTrack", TRACK);
  const saved = sameTrack ? parseFloat(store.get("bgmTime") || "0") : 0;

  // A different song than the last page fades in instead of starting loud
  let needFadeIn = prevTrack !== null && !sameTrack;
  if (needFadeIn) audio.volume = 0;
  audio.addEventListener("playing", () => {
    if (needFadeIn) { needFadeIn = false; fadeTo(VOLUME, 2500); }
  });

  audio.addEventListener("loadedmetadata", () => {
    if (saved > 0 && saved < audio.duration) audio.currentTime = saved;
  });
  audio.addEventListener("timeupdate", () => {
    store.set("bgmTime", String(audio.currentTime));
  });
  audio.addEventListener("error", () => { broken = true; });

  function update() {
    if (broken) return;
    const shouldPlay = started && !isMuted() && blockers.size === 0;
    if (shouldPlay) {
      audio.play().catch(() => {
        document.addEventListener("pointerdown", update, { once: true });
      });
    } else {
      audio.pause();
    }
  }

  function block(reason) { blockers.add(reason); update(); }
  function unblock(reason) { blockers.delete(reason); update(); }
  function pauseFor(reason, ms) { block(reason); setTimeout(() => unblock(reason), ms); }

  // Browsers only allow sound after a tap, so the first tap starts the music
  if (!started) {
    document.addEventListener("pointerdown", () => {
      started = true;
      store.set("bgmStarted", "1");
      update();
    }, { once: true });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) block("tab hidden"); else unblock("tab hidden");
  });
  document.addEventListener("soundchange", update);

  // Pages without a top bar (start, loading, credits) get a small mute button
  if (!document.getElementById("topbar")) {
    const btn = document.createElement("button");
    btn.className = "sound-float";
    btn.setAttribute("aria-label", "Toggle sound");
    btn.textContent = isMuted() ? "🔇" : "🔊";
    btn.addEventListener("click", () => {
      setMuted(!isMuted());
      btn.textContent = isMuted() ? "🔇" : "🔊";
      document.dispatchEvent(new Event("soundchange"));
    });
    document.body.appendChild(btn);
  }

  update();
  return { block, unblock, pauseFor, fadeOut };
})();