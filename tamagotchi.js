// #region Objects
const pet = {
    energy: 50,

    rest(){
        this.energy += 10;
        console.log(this.energy);
    },
}
// #endregion

// #region Functions
function handleRestClick(){
    pet.rest();
}
// #endregion

// #region Variables
const restButton = document.getElementById("rest");
// #endregion

// #region Event Listeners
 restButton.addEventListener("click", handleRestClick);
// #endregion
