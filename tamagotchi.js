// #region Objects
const pet = {
  energy: 50,

  rest() {
    if (this.energy <= 80) {
      this.energy = Math.min(this.energy + 10, 100);
      console.log("tired");
    } else {
      console.log("not tired");
    }
  },
};

const ui = {
  energyBar: document.getElementById("energyBar"),
  energyValue: document.getElementById("energyValue"),
  restButton: document.getElementById("rest"),

  update() {
    this.energyBar.value = pet.energy;
    //add text to html with id 
    this.energyValue.textContent = pet.energy;
    this.restButton.classList.toggle("inactive", pet.energy > 80);
  },
};
// #endregion

// #region Functions
function handleRestClick() {
  pet.rest();
  ui.update();
}
// #endregion

// #region Event Listeners
ui.restButton.addEventListener("click", handleRestClick);
// #endregion
