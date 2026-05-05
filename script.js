const startButton = document.querySelector(".start-button");
const muteButton = document.querySelector(".mute-button");
const birthdayMusic = document.querySelector("#birthday-music");
const birthdayNote = document.querySelector(".birthday-note");
const glowBlur = document.querySelector("#redGlow feGaussianBlur");

let isMuted = false;

const firstLoadKey = "hasSeenFirstRose";
const messageIndexKey = "roseMessageIndex";
const bestFirstPalette = "crimson-velvet";
const bestFirstDrawStyle = "single-line";

const messages = [
  "Hope your day comes with cake and zero stress.",
  "A tiny rose, because confetti felt too loud.",
  "Wishing you laughs, snacks, and main-character energy.",
  "I hope this makes you smile, even just a little.",
  "Hope your day is full of good food and better vibes.",
  "Another year wiser, cooler, and harder to impress.",
  "May your birthday be low-stress and high-dessert.",
  "A little birthday magic, because normal cards are boring.",
  "may every smile today be appointment-free.",
  "Hope your birthday is binge-worthy in the best way.",
  "May your perfume last long and your food arrive hot.",
  "Hope today feels like the first sip of really good coffee.",
  "May your coffee be perfect and your day be even better.",
  "Hope today gives you a reason to pause and actually enjoy it.",
];

const palettes = [
  {
    name: "crimson-velvet",
    vars: {
      "--stroke-1": "#ff7a82",
      "--stroke-2": "#ff1730",
      "--stroke-3": "#a80018",
      "--stroke-4": "#52000b",
      "--fill-1": "#ff6069",
      "--fill-2": "#da1026",
      "--fill-3": "#72000d",
      "--fill-4": "#240004",
      "--glow-small": "rgba(229, 9, 34, .32)",
      "--glow-large": "rgba(120, 0, 18, .24)",
      "--accent-glow": "rgba(229, 9, 34, .34)",
      "--button-border": "rgba(255, 82, 94, .58)",
      "--button-bg-hover": "rgba(48, 0, 7, .5)",
      "--bg-red": "rgba(190, 0, 24, .12)",
      "--stroke-width": "2.35",
      "--dash-size": "650",
      "--draw-duration": "24s",
      "--line-opacity": ".96",
      "--fill-delay": "14s",
      "--wish-delay": "11.5s",
      "--fill-opacity": ".54",
      "--float-duration": "9s",
      "--rose-mobile-top": "39%",
      "--rose-mobile-size": "118vmin",
    },
    blur: "1.35",
  },
  {
    name: "scarlet-neon",
    vars: {
      "--stroke-1": "#ff9ba3",
      "--stroke-2": "#ff2340",
      "--stroke-3": "#c90020",
      "--stroke-4": "#61000d",
      "--fill-1": "#ff727b",
      "--fill-2": "#ed1732",
      "--fill-3": "#850010",
      "--fill-4": "#280004",
      "--glow-small": "rgba(255, 40, 66, .4)",
      "--glow-large": "rgba(170, 0, 28, .3)",
      "--accent-glow": "rgba(255, 40, 66, .32)",
      "--button-border": "rgba(255, 76, 98, .62)",
      "--button-bg-hover": "rgba(54, 0, 10, .52)",
      "--bg-red": "rgba(220, 0, 35, .14)",
      "--stroke-width": "2.45",
      "--dash-size": "650",
      "--draw-duration": "23s",
      "--line-opacity": ".98",
      "--fill-delay": "13.2s",
      "--wish-delay": "10.9s",
      "--fill-opacity": ".56",
      "--float-duration": "8.8s",
      "--rose-mobile-top": "38.5%",
      "--rose-mobile-size": "120vmin",
    },
    blur: "1.55",
  },
  {
    name: "dark-rose-pink",
    vars: {
      "--stroke-1": "#ffd3df",
      "--stroke-2": "#d95583",
      "--stroke-3": "#8c1c48",
      "--stroke-4": "#3b061b",
      "--fill-1": "#f5a7bd",
      "--fill-2": "#b92d62",
      "--fill-3": "#5a0d2b",
      "--fill-4": "#17020a",
      "--glow-small": "rgba(210, 70, 125, .28)",
      "--glow-large": "rgba(130, 25, 70, .18)",
      "--accent-glow": "rgba(210, 70, 125, .22)",
      "--button-border": "rgba(210, 70, 125, .5)",
      "--button-bg-hover": "rgba(44, 5, 24, .5)",
      "--bg-red": "rgba(150, 35, 85, .08)",
      "--stroke-width": "2.2",
      "--dash-size": "650",
      "--draw-duration": "25s",
      "--line-opacity": ".95",
      "--fill-delay": "14.6s",
      "--wish-delay": "11.8s",
      "--fill-opacity": ".38",
      "--float-duration": "10.2s",
      "--rose-mobile-top": "39%",
      "--rose-mobile-size": "118vmin",
    },
    blur: "1.1",
  },
  {
    name: "violet-sapphire",
    vars: {
      "--stroke-1": "#d7d2ff",
      "--stroke-2": "#746dff",
      "--stroke-3": "#35249e",
      "--stroke-4": "#12083f",
      "--fill-1": "#b6afff",
      "--fill-2": "#5144d7",
      "--fill-3": "#21145f",
      "--fill-4": "#070316",
      "--glow-small": "rgba(105, 92, 255, .34)",
      "--glow-large": "rgba(48, 34, 160, .22)",
      "--accent-glow": "rgba(105, 92, 255, .24)",
      "--button-border": "rgba(105, 92, 255, .55)",
      "--button-bg-hover": "rgba(14, 10, 48, .54)",
      "--bg-red": "rgba(70, 55, 210, .09)",
      "--stroke-width": "2.25",
      "--dash-size": "650",
      "--draw-duration": "25s",
      "--line-opacity": ".96",
      "--fill-delay": "14.2s",
      "--wish-delay": "11.6s",
      "--fill-opacity": ".4",
      "--float-duration": "9.6s",
      "--rose-mobile-top": "39.5%",
      "--rose-mobile-size": "118vmin",
    },
    blur: "1.2",
  },
  {
    name: "champagne-gold",
    vars: {
      "--stroke-1": "#fff1c5",
      "--stroke-2": "#d9a441",
      "--stroke-3": "#8a5618",
      "--stroke-4": "#321b05",
      "--fill-1": "#ffe9ad",
      "--fill-2": "#b97822",
      "--fill-3": "#5a310b",
      "--fill-4": "#120902",
      "--glow-small": "rgba(217, 164, 65, .32)",
      "--glow-large": "rgba(135, 82, 18, .18)",
      "--accent-glow": "rgba(217, 164, 65, .22)",
      "--button-border": "rgba(217, 164, 65, .5)",
      "--button-bg-hover": "rgba(42, 25, 6, .52)",
      "--bg-red": "rgba(217, 164, 65, .07)",
      "--stroke-width": "2.15",
      "--dash-size": "650",
      "--draw-duration": "25s",
      "--line-opacity": ".95",
      "--fill-delay": "14.5s",
      "--wish-delay": "11.8s",
      "--fill-opacity": ".4",
      "--float-duration": "10.4s",
      "--rose-mobile-top": "38.5%",
      "--rose-mobile-size": "119vmin",
    },
    blur: "1.05",
  },
  {
    name: "moonlit-white",
    vars: {
      "--stroke-1": "#ffffff",
      "--stroke-2": "#e7e0d3",
      "--stroke-3": "#a59b8b",
      "--stroke-4": "#4a4640",
      "--fill-1": "#ffffff",
      "--fill-2": "#cfc8bb",
      "--fill-3": "#686056",
      "--fill-4": "#151412",
      "--glow-small": "rgba(255, 255, 255, .24)",
      "--glow-large": "rgba(190, 185, 175, .14)",
      "--accent-glow": "rgba(255, 255, 255, .18)",
      "--button-border": "rgba(235, 231, 222, .48)",
      "--button-bg-hover": "rgba(42, 39, 34, .5)",
      "--bg-red": "rgba(255, 255, 255, .055)",
      "--stroke-width": "2.05",
      "--dash-size": "650",
      "--draw-duration": "26s",
      "--line-opacity": ".94",
      "--fill-delay": "14.8s",
      "--wish-delay": "12s",
      "--fill-opacity": ".36",
      "--float-duration": "10.8s",
      "--rose-mobile-top": "38%",
      "--rose-mobile-size": "119vmin",
    },
    blur: "1.0",
  },
];

const drawStyles = [
  {
    name: "single-line",
    vars: {
      "--prelude-display": "none",
      "--prelude-stem-display": "none",
      "--prelude-bloom-display": "none",
      "--ghost-display": "none",
      "--spark-display": "none",
      "--line-delay": "0s",
      "--fill-delay": "14s",
      "--wish-delay": "11.5s",
    },
  },
  {
    name: "stem-first",
    vars: {
      "--prelude-display": "block",
      "--prelude-stem-display": "block",
      "--prelude-bloom-display": "none",
      "--ghost-display": "none",
      "--spark-display": "none",
      "--prelude-duration": "8.6s",
      "--line-delay": "3.6s",
      "--fill-delay": "16.4s",
      "--wish-delay": "13.4s",
    },
  },
  {
    name: "bloom-first",
    vars: {
      "--prelude-display": "block",
      "--prelude-stem-display": "none",
      "--prelude-bloom-display": "block",
      "--ghost-display": "none",
      "--spark-display": "none",
      "--prelude-duration": "8.2s",
      "--line-delay": "3.3s",
      "--fill-delay": "16.2s",
      "--wish-delay": "13.2s",
    },
  },
  {
    name: "glow-first",
    vars: {
      "--prelude-display": "none",
      "--prelude-stem-display": "none",
      "--prelude-bloom-display": "none",
      "--ghost-display": "block",
      "--spark-display": "none",
      "--ghost-duration": "9s",
      "--line-delay": "2.8s",
      "--fill-delay": "16.2s",
      "--wish-delay": "13.2s",
    },
  },
  {
    name: "spark-trace",
    vars: {
      "--prelude-display": "none",
      "--prelude-stem-display": "none",
      "--prelude-bloom-display": "none",
      "--ghost-display": "none",
      "--spark-display": "block",
      "--spark-duration": "13s",
      "--spark-delay": ".8s",
      "--line-delay": "2.3s",
      "--fill-delay": "16s",
      "--wish-delay": "13s",
    },
  },
];

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickDifferent(items, storageKey, getId = (item) => item) {
  const previous = sessionStorage.getItem(storageKey);
  const options = items.length > 1
    ? items.filter((item) => getId(item) !== previous)
    : items;
  const selected = pickRandom(options);
  sessionStorage.setItem(storageKey, getId(selected));
  return selected;
}

function pickRotatingMessage() {
  const rawIndex = Number.parseInt(sessionStorage.getItem(messageIndexKey) || "0", 10);
  const index = Number.isFinite(rawIndex) && rawIndex >= 0 ? rawIndex % messages.length : 0;
  const message = messages[index];
  sessionStorage.setItem(messageIndexKey, String((index + 1) % messages.length));
  sessionStorage.setItem("lastMessage", message);
  return message;
}

function findByName(items, name) {
  return items.find((item) => item.name === name);
}

function applyVariation() {
  const isFirstSessionLoad = sessionStorage.getItem(firstLoadKey) !== "true";
  const palette = isFirstSessionLoad
    ? findByName(palettes, bestFirstPalette) || palettes[0]
    : pickDifferent(palettes, "lastPalette", (paletteItem) => paletteItem.name);
  const drawStyle = isFirstSessionLoad
    ? findByName(drawStyles, bestFirstDrawStyle) || drawStyles[0]
    : pickDifferent(drawStyles, "lastDrawStyle", (styleItem) => styleItem.name);
  const message = pickRotatingMessage();

  if (isFirstSessionLoad) {
    sessionStorage.setItem(firstLoadKey, "true");
    sessionStorage.setItem("lastPalette", palette.name);
    sessionStorage.setItem("lastDrawStyle", drawStyle.name);
  }

  document.body.dataset.palette = palette.name;
  document.body.dataset.draw = drawStyle.name;
  for (const [key, value] of Object.entries(palette.vars)) {
    document.documentElement.style.setProperty(key, value);
  }
  for (const [key, value] of Object.entries(drawStyle.vars)) {
    document.documentElement.style.setProperty(key, value);
  }

  if (glowBlur) glowBlur.setAttribute("stdDeviation", palette.blur);
  if (birthdayNote) birthdayNote.textContent = message;
}

function startMusic() {
  if (!birthdayMusic) return;

  birthdayMusic.volume = 0;
  birthdayMusic.currentTime = 0;

  birthdayMusic.play().then(() => {
    const fade = window.setInterval(() => {
      birthdayMusic.volume = Math.min(0.72, birthdayMusic.volume + 0.045);
      if (birthdayMusic.volume >= 0.72) window.clearInterval(fade);
    }, 120);
  }).catch(() => {
    document.body.classList.add("audio-blocked");
  });
}

function startExperience() {
  document.body.classList.add("is-started");
  startMusic();
}

function toggleMute() {
  isMuted = !isMuted;
  document.body.classList.toggle("is-muted", isMuted);
  muteButton.setAttribute("aria-pressed", String(isMuted));
  muteButton.setAttribute("aria-label", isMuted ? "Unmute music" : "Mute music");

  if (birthdayMusic) {
    birthdayMusic.muted = isMuted;
  }
}

applyVariation();
startButton.addEventListener("click", startExperience);
muteButton.addEventListener("click", toggleMute);
