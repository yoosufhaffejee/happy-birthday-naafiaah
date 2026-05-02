const startButton = document.querySelector(".start-button");
const muteButton = document.querySelector(".mute-button");
const birthdayMusic = document.querySelector("#birthday-music");

let isMuted = false;

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

startButton.addEventListener("click", startExperience);
muteButton.addEventListener("click", toggleMute);
