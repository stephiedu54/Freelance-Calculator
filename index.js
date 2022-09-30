// FONCTION CALCUL DES GAINS
const calculGain = () => {
  checkInputs();
  // Récupération du formulaire dans le HTML
  let myForm = document.getElementById("formContainer");

  // Transformation en objet FormData
  let formObj = new FormData(myForm);

  // Récupération des inputs par leur name
  let calculDatas = {
    tauxHoraire: formObj.get("thPrice"),
    tauxJournalier: formObj.get("tjmPrice"),
    extras: formObj.get("extrasPrice"),

    qteHoraire: formObj.get("thQte"),
    qteJournalier: formObj.get("tjmQte"),
    qteExtras: formObj.get("extrasQte"),

    charges: formObj.get("feesSet"),

    gainHeure: function () {
      return this.tauxHoraire * this.qteHoraire;
    },
    gainJournalier: function () {
      return this.tauxJournalier * this.qteJournalier;
    },
    gainExtras: function () {
      return this.extras * this.qteExtras;
    },

    totalBrut: function () {
      return this.gainHeure() + this.gainJournalier() + this.gainExtras();
    },
    fees: function () {
      return this.totalBrut() * (this.charges / 100);
    },
    totalNet: function () {
      return this.totalBrut() - this.fees();
    },
  };

  // Calcul des gains

  // Brut

  document.getElementById("brutResult").innerText = `${calculDatas
    .totalBrut()
    .toFixed(2)} €`;

  // Taxes
  document.getElementById("taxes").innerText = `${calculDatas
    .fees()
    .toFixed(2)} €`;

  // Net
  document.getElementById("netResult").innerText = `${calculDatas
    .totalNet()
    .toFixed(2)} €`;
};

// FONCTION VERIFICATION DES INPUTS (si > 0)
const checkInputs = () => {
  myInputs.forEach((myInput) => {
    if (myInput.value < 0) {
      myInput.value = 0;
    }
  });
};

// AJOUT DES EVENTS

// 1 - Bouton "Reset"
let resetBtn = document.getElementById("btn");

const resetAll = () => {
  document.getElementById("brutResult").innerText = "0.00 €";
  document.getElementById("taxes").innerText = "0.00 €";
  document.getElementById("netResult").innerText = "0.00 €";
};

resetBtn.addEventListener("click", resetAll);

// 2 - Inputs onkeyup
let myInputs = document.querySelectorAll("input");

myInputs.forEach((myInput) => {
  myInput.addEventListener("keyup", calculGain);
  myInput.addEventListener("change", calculGain);
});

/*
// ANIMATION DES COMPTEURS

$(document).ready(() => {
  $("#brutResult").counterUp({
    time: 2000,
  });
});

NON FONCTIONNEL !!! */
