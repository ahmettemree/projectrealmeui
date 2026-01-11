
/* ===== Origin / Realme Animation Config ===== */
const config = {
  time_allTmp: 0.47,
  valScaleApp: 94,
  valScaleWallpaper: 110,
  cubic_ratioParam: "cubic-bezier(0.00,1.00,0.35,0.80)",
  cubic_allParam: "cubic-bezier(0.30,0.70,0.30,0.90)",
  timeHidingIconAppTmp: 0.3,
  delayHidingIconAppTmp: 0.05,
  positionIconOpening: "top",
  sizeIconOpening: "100%",
  valTimeTransform: 0.53,
  valDampingTransform: 0,
  timeScale: 0.73,
  valDampingScale: 0.1,
  valEasing: 0,
  timeShowingIconAppTmp: 0.60,
  delayShowingIconAppTmp: 0.03,
};

/* ===== Saat ===== */
function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;

  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  clock.textContent = `${h}:${m}`;
}
setInterval(updateClock, 1000);
updateClock();

/* ===== App Aç / Kapat (Origin hissi) ===== */
function openApp() {
  const app = document.getElementById("appWindow");
  if (!app) return;

  app.classList.remove("hidden");

  app.style.transition = `
    opacity ${config.time_allTmp}s ${config.cubic_allParam},
    transform ${config.valTimeTransform}s ${config.cubic_ratioParam},
    backdrop-filter ${config.timeScale}s ${config.cubic_allParam}
  `;

  requestAnimationFrame(() => {
    app.style.opacity = "1";
    app.style.transform = "scale(1)";
    app.style.backdropFilter = "blur(12px)";
  });
}

function closeApp() {
  const app = document.getElementById("appWindow");
  if (!app) return;

  app.style.opacity = "0";
  app.style.transform = `scale(${config.valScaleApp / 100})`;
  app.style.backdropFilter = "blur(0px)";

  setTimeout(() => {
    app.classList.add("hidden");
  }, config.time_allTmp * 1000);
}
