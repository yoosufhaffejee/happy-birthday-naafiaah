(function () {
  var root = document.documentElement;
  var startButton = document.querySelector(".start-button");
  var muteButton = document.querySelector(".mute-button");
  var birthdayMusic = document.querySelector("#birthday-music");
  var birthdayNote = document.querySelector(".birthday-note");
  var glowBlur = document.querySelector("#redGlow feGaussianBlur");
  var isMuted = false;

  var messages = [
    "I hope this makes you smile, even just a little.",
    "May every smile today be appointment-free.",
    "A tiny rose, because confetti felt too loud.",
    "Hope your day comes with cake and zero stress.",
    "Another year wiser, cooler, and harder to impress.",
    "Hope today feels like the first sip of really good coffee.",
    "Wishing you laughs, snacks, and main-character energy.",
    "A little birthday magic, because normal cards are boring.",
    "May your perfume last long and your food arrive hot.",
    "Hope today gives you a reason to pause and actually enjoy it.",
    "May your birthday be low-stress and high-dessert.",
    "May your coffee be perfect and your day be even better.",
    "Hope your day is full of good food and better vibes.",
    "Hope your birthday is binge-worthy in the best way."
  ];

  var paletteVars = {
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
    "--stroke-width": "2",
    "--dash-size": "650",
    "--draw-duration": "15s",
    "--line-opacity": ".96",
    "--fill-delay": "9s",
    "--wish-delay": "7.8s",
    "--fill-opacity": ".48",
    "--float-duration": "9s",
    "--rose-mobile-top": "39%",
    "--rose-mobile-size": "96vmin",
    "--prelude-display": "none",
    "--prelude-stem-display": "none",
    "--prelude-bloom-display": "none",
    "--ghost-display": "none",
    "--spark-display": "none",
    "--line-delay": "0s"
  };

  function setClass(element, className, enabled) {
    if (!element) return;
    if (element.classList) {
      element.classList.toggle(className, enabled);
      return;
    }
    var current = element.className || "";
    var hasClass = current.indexOf(className) !== -1;
    if (enabled && !hasClass) element.className = current + " " + className;
    if (!enabled && hasClass) element.className = current.replace(className, "");
  }

  function readStorage(key) {
    try {
      return window.sessionStorage && window.sessionStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      if (window.sessionStorage) window.sessionStorage.setItem(key, value);
    } catch (error) {
      return;
    }
  }

  function syncAppHeight() {
    var height = window.innerHeight || document.documentElement.clientHeight;
    if (!height || !root.style || !root.style.setProperty) return;
    root.style.setProperty("--app-height", Math.round(height) + "px");
  }

  function applyLegacyVariation() {
    var rawIndex = parseInt(readStorage("roseMessageIndex") || "0", 10);
    var index = isNaN(rawIndex) || rawIndex < 0 ? 0 : rawIndex % messages.length;
    var key;

    for (key in paletteVars) {
      if (Object.prototype.hasOwnProperty.call(paletteVars, key)) {
        root.style.setProperty(key, paletteVars[key]);
      }
    }

    if (glowBlur) glowBlur.setAttribute("stdDeviation", "1.35");
    if (birthdayNote) birthdayNote.innerHTML = "";
    if (birthdayNote) birthdayNote.appendChild(document.createTextNode(messages[index]));
    writeStorage("roseMessageIndex", String((index + 1) % messages.length));
  }

  function startMusic() {
    var playResult;

    if (!birthdayMusic) return;

    birthdayMusic.volume = 0.72;
    birthdayMusic.currentTime = 0;
    playResult = birthdayMusic.play();

    if (playResult && playResult.then) {
      playResult.then(null, function () {
        setClass(document.body, "audio-blocked", true);
      });
    }
  }

  function triggerTouchFeedback() {
    setClass(document.body, "is-pressing-start", true);
    window.setTimeout(function () {
      setClass(document.body, "is-pressing-start", false);
    }, 180);

    if (navigator.vibrate) {
      navigator.vibrate(12);
    }
  }

  function startExperience() {
    triggerTouchFeedback();
    setClass(document.body, "is-started", true);
    startMusic();
  }

  function toggleMute() {
    isMuted = !isMuted;
    setClass(document.body, "is-muted", isMuted);

    if (muteButton) {
      muteButton.setAttribute("aria-pressed", String(isMuted));
      muteButton.setAttribute("aria-label", isMuted ? "Unmute music" : "Mute music");
    }

    if (birthdayMusic) birthdayMusic.muted = isMuted;
  }

  syncAppHeight();
  applyLegacyVariation();

  window.addEventListener("resize", syncAppHeight);
  if (startButton) startButton.addEventListener("click", startExperience);
  if (muteButton) muteButton.addEventListener("click", toggleMute);
}());
