// Background music. It plays only when nothing is "blocking" it.
const Music = (() => {
  const audio = new Audio("audio/bgm.mp3");   // put your music file here
  audio.loop = true;
  audio.volume = 0.25;

  // Storage can be blocked, so never let it crash the page
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  };

  const blockers = new Set();   // reasons the music is paused right now
  let started = store.get("bgmStarted") === "1";
  let broken = false;           // true if the file is missing

  const saved = parseFloat(store.get("bgmTime") || "0");
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

  update();
  return { block, unblock, pauseFor };
})();