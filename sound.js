// Sound effects made with the Web Audio API (no audio files needed)
let audioCtx = null;
let muted = false;
try { muted = localStorage.getItem("muted") === "1"; } catch (e) {}

function isMuted() { return muted; }
function setMuted(value) {
  muted = value;
  try { localStorage.setItem("muted", value ? "1" : "0"); } catch (e) {}
}

function tone(freq, start, dur, type, vol) {
  const t0 = audioCtx.currentTime + start;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type || "square";
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(vol || 0.07, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

const SOUNDS = {
  tap:   () => tone(520, 0, 0.06),
  flip:  () => { tone(600, 0, 0.07, "triangle"); tone(800, 0.05, 0.07, "triangle"); },
  match: () => { tone(660, 0, 0.1, "triangle"); tone(880, 0.09, 0.14, "triangle"); },
  wrong: () => { tone(220, 0, 0.12, "sawtooth", 0.05); tone(160, 0.1, 0.16, "sawtooth", 0.05); },
  chest: () => [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.08, 0.18, "triangle", 0.08)),
  win:   () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, i === 3 ? 0.5 : 0.16, "triangle", 0.09)),
};

function playSound(name) {
  if (muted || !SOUNDS[name]) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    SOUNDS[name]();
  } catch (e) {}
}