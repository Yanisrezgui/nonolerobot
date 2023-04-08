var NonoLife = undefined;
let play = true;
let LifeBar = document.getElementById("myBar")

// Initialise la direction actuelle du robot
let currentDirection = { x: -1, y: 1 };

const changeDetectionCircleRadius = (newRadius) => {
    detectionCircle.clear(); // Effacer la forme graphique existante
    detectionCircle.beginFill(0xFFFFFF, 0.2);
    detectionCircle.drawCircle(0, 0, newRadius);
    detectionCircle.endFill();
}

const startGame = () => {
    app.ticker.add(delta => {
        loop();
        checkCollision();
        // checkDetection();
    });
}

const loop = () => {
    // On déplace le robot dans la direction actuelle
    robot.x += currentDirection.x * speedFactor;
    robot.y += currentDirection.y * speedFactor;

    let detectedApples = [];

    // On vérifie si un arbre se trouve dans la zone de détection

    for (let i = 0; i < trees.length; i++) {
        const object = trees[i];
        // Vérifier si c'est une pomme plutôt qu'un arbre
        if (object.type === "apple") {
            let distance = calculateDistance(robot, object);
            if (distance < detectionRadius) {
                detectedApples.push(object);
            }
        } else {
            let distance = calculateDistance(robot, object);
            if (distance < detectionRadius) {
                // Si un arbre se trouve à moins de 'detectionRadius' pixels du robot, on fait pivoter le robot dans la direction opposée
                let angle = angleBetween(robot, object);
                currentDirection.y -= Math.sin(angle) * 2;
                currentDirection.x -= Math.cos(angle) * 2;
            }
        }
    }

    for (let i = 0; i < detectedApples.length; i++) {
        const apple = detectedApples[i];
        let angle = angleBetween(robot, apple);
        currentDirection.y += Math.sin(angle) * 2;
        currentDirection.x += Math.cos(angle) * 2;
    }

    // On vérifie si une ou plusieurs pomme(s) se trouve(nt) dans la zone de détection
    for (let i = 0; i < apples.length; i++) {
        const apple = apples[i];
        let distance = calculateDistance(robot, apple);
        if (distance < detectionRadius) {
            detectedApples.push(apple);
        }
    }

    for (let i = 0; i < detectedApples.length; i++) {
        const apple = detectedApples[i];
        let angle = angleBetween(robot, apple);
        currentDirection.y += Math.sin(angle) * 1;
        currentDirection.x += Math.cos(angle) * 1;
    }


    // Normaliser la direction actuelle pour maintenir une vitesse constante
    let directionLength = Math.sqrt(currentDirection.x * currentDirection.x + currentDirection.y * currentDirection.y);
    currentDirection.x /= directionLength;
    currentDirection.y /= directionLength;

    // On verifie que le robot reste sur la carte
    if (robot.x + robot.width / 2 > app.screen.width + 50) {
        robot.x = 10;
    }
    if (robot.x - robot.width / 2 < -30) {
        robot.x = app.screen.width;
    }
    if (robot.y + robot.height / 2 > app.screen.height + 50) {
        robot.y = 10;
    }
    if (robot.y - robot.height / 2 < -30) {
        robot.y = app.screen.height;
    }

    // Mettre à jour les coordonnées du cercle de détection
    // detectionCircle.x = robot.x;
    // detectionCircle.y = robot.y;
}

// Calcule la distance entre deux objets
const calculateDistance = (obj1, obj2) => {
    let xDiff = obj1.x - obj2.x;
    let yDiff = obj1.y - obj2.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

// calculer l'angle entre deux objets
const angleBetween = (sprite1, sprite2) => {
    return Math.atan2(sprite2.y - sprite1.y, sprite2.x - sprite1.x);
}

// Ajoutez une fonction pour vérifier la collision entre le robot et les pommes
const checkCollision = () => {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (robot.x <= (apple.x + apple.width) && (robot.x + robot.width) >= apple.x &&
            robot.y <= (apple.y + apple.height) && (robot.y + robot.height) >= apple.y) {
            app.stage.removeChild(apple);
            apples.splice(i, 1);
            appleCounter--
            NonoLife++
            LifeBar.style.width = NonoLife + "%";
            LifeBar.innerHTML = NonoLife + "%"
        }
    }
}

// const checkDetection = () => {
//     detectionCircle.x = robot.x + robot.width / 2;
//     detectionCircle.y = robot.y + robot.height / 2;
//     for (let i = 0; i < trees.length; i++) {
//         let tree = trees[i];
//         let distance = Math.sqrt(Math.pow(tree.x - detectionCircle.x, 2) + Math.pow(tree.y - detectionCircle.y, 2));
//         if (distance < detectionRadius + tree.width / 2) {
//         }
//     }
// }

const initAll = () => {
    initApp();
    initRobot();
    initTrees();
    initFruits();
    initDetectionSensorL();
    initDetectionSensorR();
    NonoLife = 100;

    startGame(NonoLife);
}

const appReset = () => {
    app.destroy({
        children: true,
        texture: false,
        baseTexture: false
    });

    trees = [];
    apples = [];
    appleCounter = -1;

    initAll();
}


document.getElementById("play-button").addEventListener("click", () => {
    if (play) {
        document.getElementById("img-play-pause").src = "../images/options/play.png";
        app.stop();
    } else {
        document.getElementById("img-play-pause").src = "../images/options/pause.png";
        appReset();
    }

    play = !play;
})

addEventListener("DOMContentLoaded", () => {
    document.getElementById("cherries").value = appleAmount;
    document.getElementById("tree").value = treeAmount;
    document.getElementById("sensors").value = detectionRadius;
    document.getElementById("speed").value = speedFactor;

    initAll();
})

setInterval(LoseLife, 2000)
function LoseLife() {
    if (NonoLife <= 0) {
        app.stop();
        document.getElementById('dialog').ariaHidden = "false"
    } else {
        NonoLife--
        LifeBar.style.width = NonoLife + "%";
        LifeBar.innerHTML = NonoLife + "%"
    }
}

document.getElementById('replay').addEventListener("click", () => {
    document.getElementById('dialog').ariaHidden = "true"
    appReset()
})