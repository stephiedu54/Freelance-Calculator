// FONCTION CALCUL DES GAINS
const calculGain = () => {
  checkInputs();
  // Récupération du formulaire dans le HTML
  let myForm = document.getElementById("formContainer");

  // Transformation en objet FormData
  let formObj = new FormData(myForm);

  // Récupération des inputs par leur name
  let tauxHoraire = formObj.get("thPrice");
  let tauxJournalier = formObj.get("tjmPrice");
  let extras = formObj.get("extrasPrice");

  let qteHoraire = formObj.get("thQte");
  let qteJournalier = formObj.get("tjmQte");
  let qteExtras = formObj.get("extrasQte");

  let charges = formObj.get("feesSet");

  // Calcul des gains
  let gainHeure = tauxHoraire * qteHoraire;
  let gainJournalier = tauxJournalier * qteJournalier;
  let gainExtras = extras * qteExtras;

  // Brut
  let totalBrut = gainHeure + gainJournalier + gainExtras;
  document.getElementById("brutResult").innerText = `${totalBrut.toFixed(2)} €`;

  // Taxes
  let fees = totalBrut * (charges / 100);
  document.getElementById("taxes").innerText = `${fees.toFixed(2)} €`;

  // Net
  let totalNet = totalBrut - fees;
  document.getElementById("netResult").innerText = `${totalNet.toFixed(2)} €`;
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

// 1 - Bouton "Calculer"
let calculBtn = document.getElementById("btn");
calculBtn.addEventListener("click", calculGain);

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
