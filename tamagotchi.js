// #region Objects
const pet = {
  energy: 50,
  happiness: 50,

  rest() {
    if (this.energy <= 80) {
      this.energy = Math.min(this.energy + 10, 100);
      ui.speak("Napping");
    } else {
      ui.speak("I'm not tired");
    }
  },

  play() {
    if (this.happiness <= 80) {
      this.happiness = Math.min(this.happiness + 10, 100);
      ui.speak("Playing");
    } else {
      ui.speak("Too tired to play");
    }
  },

  Decay() {
    this.energy = Math.max(this.energy - 1, 0);
    this.happiness = Math.max(this.happiness - 2, 0);
  },
};

const ui = {
  //energy related
  energyBar: document.getElementById("energyBar"),
  energyValue: document.getElementById("energyValue"),
  restButton: document.getElementById("rest"),

  //happiness related
  happyBar: document.getElementById("happyBar"),
  happyValue: document.getElementById("happyValue"),
  playButton: document.getElementById("play"),

  petSpeech: document.getElementById("petSpeech"),
  restartButton: document.getElementById("restartButton"),
  petInfoContainer: document.querySelector(".pet-info-container"),
  gameOverText: document.getElementById("gameOverText"),
  gameOverContainer: document.getElementById("gameOverContainer"),

  barColour(bar) {
    if (bar.value < 25) {
      bar.classList.remove("orange");
      bar.classList.add("red");
    } else if (bar.value < 45) {
      bar.classList.remove("green");
      bar.classList.remove("red");
      bar.classList.add("orange");
    } else {
      bar.classList.remove("red");
      bar.classList.remove("orange");
      bar.classList.add("green");
    }
  },

  update() {
    this.energyBar.value = pet.energy;
    this.energyValue.textContent = pet.energy;
    this.restButton.classList.toggle("inactive", pet.energy > 80);
    this.happyBar.value = pet.happiness;
    this.happyValue.textContent = pet.happiness;
    this.playButton.classList.toggle("inactive", pet.happiness > 80);
    this.barColour(this.energyBar);
    this.barColour(this.happyBar);
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
    if (pet.energy <= 0 || pet.happiness <= 0) {
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
    pet.happiness = 50;
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

function handlePlayClick() {
  pet.play();
  ui.update();
}

function handleResetClick() {
  game.restart();
}
// #endregion

// #region Events
ui.restButton.addEventListener("click", handleRestClick);
ui.playButton.addEventListener("click", handlePlayClick);
ui.restartButton.addEventListener("click", handleResetClick);

game.start();
// #endregion
