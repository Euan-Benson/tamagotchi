// #region Classes
class PetDifficulty {
  constructor(ui, difficulty = "medium") {
    this.energy = 50;
    this.happiness = 50;
    this.hunger = 50;
    this.decayRate = 2;
    this.ui = ui;

    switch (difficulty) {
      case "easy":
        this.energy = 60;
        this.happiness = 60;
        this.hunger = 40;
        this.decayRate = 1;
        break;
      case "medium":
        this.energy = 50;
        this.happiness = 50;
        this.hunger = 50;
        this.decayRate = 2;
        break;
      case "hard":
        this.energy = 40;
        this.happiness = 40;
        this.hunger = 60;
        this.decayRate = 3;
        break;
    }
  }

  rest() {
    if (this.energy <= 80) {
      this.energy = Math.min(this.energy + 10, 100);
      //this.happiness = Math.min(this.happiness + 2, 100);
      //this.hunger = Math.max(this.hunger + 5, 0);
      this.ui.speak("Napping");
    } else {
      this.ui.speak("I'm not tired");
    }
    this.ui.update();
  }

  play() {
    if (this.happiness <= 80) {
      //this.energy = Math.min(this.energy - 5, 100);
      this.happiness = Math.min(this.happiness + 10, 100);
      //this.hunger = Math.max(this.hunger + 5, 0);
      this.ui.speak("Playing");
    } else {
      this.ui.speak("I don't wanna play");
    }
    this.ui.update();
  }

  feed() {
    if (this.hunger >= 20) {
      //this.energy = Math.min(this.energy + 2, 100);
      //this.happiness = Math.min(this.happiness + 2, 100);
      this.hunger = Math.max(this.hunger - 10, 0);
      this.ui.speak("Eating");
    } else {
      this.ui.speak("I don't wanna eat");
    }
    this.ui.update();
  }

  decay() {
    this.energy = Math.max(this.energy - this.decayRate, 0);
    this.happiness = Math.max(this.happiness - this.decayRate, 0);
    this.hunger = Math.max(this.hunger + this.decayRate, 0);
  }
}

class UI {
  constructor() {
    this.pet = null;

    //energy
    this.energyBar = document.getElementById("energyBar");
    this.energyValue = document.getElementById("energyValue");
    this.restButton = document.getElementById("rest");

    //happiness
    this.happyBar = document.getElementById("happyBar");
    this.happyValue = document.getElementById("happyValue");
    this.playButton = document.getElementById("play");

    //hunger
    this.hungerBar = document.getElementById("hungerBar");
    this.hungerValue = document.getElementById("hungerValue");
    this.feedButton = document.getElementById("feed");

    //buttons and text boxes
    this.petSpeech = document.getElementById("petSpeech");
    this.restartButton = document.getElementById("restartButton");
    this.petInfoContainer = document.querySelector(".pet-info-container");
    this.gameOverText = document.getElementById("gameOverText");
    this.gameOverContainer = document.getElementById("gameOverContainer");
    this.petNameInput = document.getElementById("inputName");
    this.petNameDisplay = document.getElementById("displayName");

    this.difficultySelect = document.getElementById("difficultySelect");
  }

  setPet(pet) {
    this.pet = pet;
  }

  changePetName() {
    const name = this.petNameInput.value.trim();
    this.petNameDisplay.textContent = name || "Your Pet";
  }

  barColour(bar, value) {
    if (value < 25) {
      bar.classList.remove("orange");
      bar.classList.add("red");
    } else if (value < 45) {
      bar.classList.remove("green");
      bar.classList.remove("red");
      bar.classList.add("orange");
    } else {
      bar.classList.remove("red");
      bar.classList.remove("orange");
      bar.classList.add("green");
    }
  }

  update() {
    //energy
    this.energyBar.value = this.pet.energy;
    this.energyValue.textContent = this.pet.energy;
    this.restButton.classList.toggle("inactive", this.pet.energy > 80);
    this.barColour(this.energyBar, this.energyBar.value);
    //happiness
    this.happyBar.value = this.pet.happiness;
    this.happyValue.textContent = this.pet.happiness;
    this.playButton.classList.toggle("inactive", this.pet.happiness > 80);
    this.barColour(this.happyBar, this.happyBar.value);
    //hunger
    this.hungerBar.value = this.pet.hunger;
    this.hungerValue.textContent = this.pet.hunger;
    this.feedButton.classList.toggle("inactive", this.pet.hunger < 20);
    this.barColour(this.hungerBar, 100 - this.hungerBar.value);
  }

  speak(message) {
    this.petSpeech.textContent = message;
  }

  showGameOvermessage(message) {
    this.petSpeech.textContent = "";
    this.gameOverText.textContent = message;
    this.gameOverContainer.classList.remove("hidden");
    this.petInfoContainer.classList.add("hidden");
  }

  hideGameOvermessage() {
    this.gameOverContainer.classList.add("hidden");
    this.petInfoContainer.classList.remove("hidden");
  }

  disableAllButtons() {
    this.restButton.disabled = true;
    this.playButton.disabled = true;
    this.feedButton.disabled = true;
  }

  enableAllButtons() {
    this.restButton.disabled = false;
    this.playButton.disabled = false;
    this.feedButton.disabled = false;
  }
}

class Game {
  constructor(pet, ui) {
    this.pet = pet;
    this.ui = ui;

    this.timer = null;
    this.isGameOver = false;
  }

  timePass = () => {
    if (this.isGameOver) return;
    this.pet.decay();
    this.ui.update();
    this.checkGameOver();
  };

  start() {
    this.timer = setInterval(this.timePass, 1500);
  }

  stop() {
    clearInterval(this.timer);
  }

  checkGameOver() {
    if (
      this.pet.energy <= 0 ||
      this.pet.happiness <= 0 ||
      this.pet.hunger >= 100
    ) {
      this.gameOver();
    }
  }

  gameOver() {
    this.isGameOver = true;
    this.stop();
    this.ui.showGameOvermessage("They died :(");
    this.ui.disableAllButtons();
  }

  restart() {
    const currentDifficulty = this.ui.difficultySelect.value;
    newPet = new PetDifficulty(ui, currentDifficulty);
    this.pet = newPet;
    this.ui.setPet(newPet);

    this.isGameOver = false;
    this.ui.hideGameOvermessage();
    this.ui.enableAllButtons();
    this.ui.update();
    this.start();
  }
}
// #endregion

const ui = new UI();

let newPet = new PetDifficulty(ui, ui.difficultySelect.value);
ui.setPet(newPet);

const game = new Game(newPet, ui);

// #region Functions
function handlePetName() {
  ui.changePetName();
}

function handleRestClick() {
  newPet.rest();
}

function handlePlayClick() {
  newPet.play();
}

function handleFeedClick() {
  newPet.feed();
}

function handleRestartClick() {
  game.restart();
}
// #endregion

// #region Events
ui.petNameInput.addEventListener("input", handlePetName);

ui.restButton.addEventListener("click", handleRestClick);
ui.playButton.addEventListener("click", handlePlayClick);
ui.feedButton.addEventListener("click", handleFeedClick);

ui.difficultySelect.addEventListener("input", handleRestartClick);
ui.restartButton.addEventListener("click", handleRestartClick);

ui.update();
game.start();
// #endregion
