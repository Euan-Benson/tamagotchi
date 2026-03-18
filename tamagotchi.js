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
    console.log(this.energy);
  },
};

const ui = {
  energyBar: document.getElementById("energyBar"),
  energyValue: document.getElementById("energyValue"),
  restButton: document.getElementById("rest"),

  update() {
    this.energyBar.value = pet.energy;
    this.energyValue.textContent = pet.energy;
  },
};
// #endregion

// #region Functions
function handleRestClick() {
  pet.rest();
}
// #endregion

// #region Event Listeners
ui.restButton.addEventListener("click", handleRestClick);
// #endregion
