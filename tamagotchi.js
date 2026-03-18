// #region Objects
const pet = {
  energy: 50,

  rest() {
    if (this.energy <= 80) {
      this.energy = Math.min(this.energy + 10, 100);     
    }
    console.log(this.energy);
  },
};
// #endregion

// #region Functions
function handleRestClick() {
  pet.rest();
}
// #endregion

// #region Variables
const restButton = document.getElementById("rest");
// #endregion

// #region Event Listeners
restButton.addEventListener("click", handleRestClick);
// #endregion
