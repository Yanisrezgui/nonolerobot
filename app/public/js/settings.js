let appleAmount = 20;
let treeAmount = 20;
let detectionRadius = 50;
let speedFactor = 2;

// Ajoutez un compteur pour les pommes
let appleCounter = 0;
// Ajoutez un tableau pour les pommes
let apples = [];
// Ajoutez un tableau pour les arbres
let trees = [];

document.getElementById("submit").addEventListener("click", () => {
    appleAmount = document.getElementById("cherries").value;
    treeAmount = document.getElementById("tree").value;
    detectionRadius = document.getElementById("sensors").value;
    speedFactor = document.getElementById("speed").value;

    changeDetectionCircleRadius(detectionRadius);
});
