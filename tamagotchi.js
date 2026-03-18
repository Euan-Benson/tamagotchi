// #region Objects
const pet = {
  energy: 50,

  rest() {
    if (this.energy <= 80) {
      this.energy = Math.min(this.energy + 10, 100);
      ui.speak("Napping");
    } else {
      ui.speak("I'm not tired");
    }
  },

  Decay() {
    this.energy = Math.max(this.energy - 1, 0);
  },
};

const ui = {
  energyBar: document.getElementById("energyBar"),
  energyValue: document.getElementById("energyValue"),
  restButton: document.getElementById("rest"),
  petSpeech: document.getElementById("petSpeech"),
  restartButton: document.getElementById("restartButton"),
  petInfoContainer: document.querySelector(".pet-info-container"),
  gameOverText: document.getElementById("gameOverText"),
  gameOverContainer: document.getElementById("gameOverContainer"),

  update() {
    this.energyBar.value = pet.energy;
    //add text to html with id
    this.energyValue.textContent = pet.energy;
    this.restButton.classList.toggle("inactive", pet.energy > 80);
  },

  speak(message) {
    this.petSpeech.textContent = message;
  },

  showGameOvermessage(message) {
    this.petSpeech.textContent = "";
    this.gameOverText.textContent = message;
    this.gameOverContainer.classList.remove("hidden");
    this.petInfoContainer.classList.add("hidden");
  },

    hideGameOvermessage() {
    this.gameOverContainer.classList.add("hidden");
    this.petInfoContainer.classList.remove("hidden");
  },
};

const game = {
  timer: null,
  isGameOver: false,

  timePass() {
    pet.Decay();
    ui.update();
  },

  start() {
    this.timer = setInterval(game.timePass, 500);
  },

  Stop() {
    clearInterval(this.timer);
  },

  checkGameOver() {
    if (pet.energy <= 0) {
      this.gameOver();
    }
  },

  gameOver() {
    //do game over stuff
    this.isGameOver = true;
    this.Stop();
    //game over message
    //disable buttons
  },

  restart() {
    //restart game
    this.isGameOver = false;
  },
};
// #endregion

// #region Functions
function handleRestClick() {
  pet.rest();
  ui.update();
}
// #endregion

// #region Events
ui.restButton.addEventListener("click", handleRestClick);

game.start();
// #endregion
