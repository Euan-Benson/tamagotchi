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

  barColour(bar) {
    if (bar < 25) {
      this.energyBar.classList.remove("orange");
      this.energyBar.classList.add("red");
    } else if (bar < 45) {
      this.energyBar.classList.remove("green");
      this.energyBar.classList.remove("red");
      this.energyBar.classList.add("orange");
    } else {
      this.energyBar.classList.remove("red");
      this.energyBar.classList.remove("orange");
      this.energyBar.classList.add("green");
    }
  },

  update() {
    this.energyBar.value = pet.energy;
    //add text to html with id
    this.energyValue.textContent = pet.energy;
    this.restButton.classList.toggle("inactive", pet.energy > 80);
    this.barColour(this.energyBar.value);
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

  disableAllButtons() {
    this.restButton.disabled = true;
  },

  enableAllButtons() {
    this.restButton.disabled = false;
  },
};

const game = {
  timer: null,
  isGameOver: false,

  timePass() {
    if (this.gameOver) {
      return;
    } else {
      pet.Decay();
      ui.update();
      game.checkGameOver();
    }
  },

  start() {
    this.timer = setInterval(game.timePass, 500);
  },

  stop() {
    clearInterval(this.timer);
  },

  checkGameOver() {
    if (pet.energy <= 0) {
      this.gameOver();
    }
  },

  gameOver() {
    this.isGameOver = true;
    this.stop();
    ui.showGameOvermessage("They died :(");
    ui.disableAllButtons();
  },

  restart() {
    //restart game
    pet.energy = 50;
    this.isGameOver = false;
    ui.hideGameOvermessage();
    ui.enableAllButtons();
    ui.update();
    this.start();
  },
};
// #endregion

// #region Functions
function handleRestClick() {
  pet.rest();
  ui.update();
}

function handleResetClick() {
  game.restart();
}
// #endregion

// #region Events
ui.restButton.addEventListener("click", handleRestClick);
ui.restartButton.addEventListener("click", handleResetClick);

game.start();
// #endregion
