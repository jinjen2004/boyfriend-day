// Fireworks: call launchFireworks(4000) to run them for about 4 seconds
function launchFireworks(duration) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "fireworks";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) { canvas.remove(); return; }

  const dpr = window.devicePixelRatio || 1;
  let W = 0, H = 0;
  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = ["#ffc629", "#c23be0", "#4da3ff", "#ffffff", "#ff6b6b", "#5ee27a"];
  const rockets = [];
  const sparks = [];
  const t0 = performance.now();
  let last = t0;
  let lastLaunch = 0;

  function launch() {
    rockets.push({
      x: W * (0.15 + Math.random() * 0.7),
      y: H,
      vy: -(8 + Math.random() * 3),
      targetY: H * (0.15 + Math.random() * 0.4),
    });
  }

  function explode(x, y) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 5;
      sparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.012 + Math.random() * 0.012,
        color,
      });
    }
  }

  function frame(now) {
    const step = Math.min((now - last) / 16.67, 3);   // 1 = one frame at 60fps
    last = now;
    const elapsed = now - t0;

    if (elapsed < duration && now - lastLaunch > 380) {
      launch();
      lastLaunch = now;
    }

    ctx.clearRect(0, 0, W, H);

    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy * step;
      if (r.y <= r.targetY) {
        explode(r.x, r.y);
        rockets.splice(i, 1);
      } else {
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ffd84d";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.vx *= 0.985;
      s.vy = s.vy * 0.985 + 0.06 * step;
      s.x += s.vx * step;
      s.y += s.vy * step;
      s.life -= s.decay * step;
      if (s.life <= 0) {
        sparks.splice(i, 1);
      } else {
        ctx.globalAlpha = s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (elapsed < duration || rockets.length || sparks.length) {
      requestAnimationFrame(frame);
    } else {
      window.removeEventListener("resize", resize);
      canvas.remove();
    }
  }
  requestAnimationFrame(frame);
}