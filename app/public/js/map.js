app = undefined;
robot = new PIXI.Sprite.from('../images/game/robot.png');
detectionCircle = undefined;

let play = true;
let LifeBar = document.getElementById("myBar")

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

// Initialise la direction actuelle du robot
let currentDirection = { x: -1, y: 1 };

const initApp = () => {
    app = new PIXI.Application({
        width: window.innerWidth * 2 / 3,
        height: window.innerHeight,
        antialias: true,
        transparent: false,
        resolution: 1,
    });

    app.renderer.view.style.position = 'absolute'
    document.getElementById("map").appendChild(app.view);

    const herbe = new PIXI.Sprite.from('../images/game/herbe.png')
    app.stage.addChild(herbe)

    herbe.width = window.innerWidth
    herbe.height = window.innerHeight
    herbe.opacity = 0.5
};


const initRobot = () => {
    app.stage.addChild(robot)
    robot.width = 30
    robot.height = 30
    robot.position.set(200, 200)
}

const initFruits = () => {
    // Ajoutez un intervalle pour ajouter une pomme toutes les 1 secondes
    const fruitsInterval = setInterval(fruit, 1000);
    console.log(fruitsInterval)

    function fruit() {
        if (appleCounter == -1) {
            appleCounter++;
            clearInterval(fruitsInterval);
        } else if (appleCounter < appleAmount) {
            const apple = new PIXI.Sprite.from('../images/game/pomme.png');
            apple.width = 20;
            apple.height = 20;
            apple.position.set(Math.random() * app.screen.width, Math.random() * app.screen.height);
            apple.anchor.set(0.5);
            apples.push(apple);
            app.stage.addChild(apple);
            appleCounter++;
        }
    }
}

const initTrees = () => {
    // Initialiser les 20 arbres
    for (let i = 0; i < treeAmount; i++) {
        const tree = new PIXI.Sprite.from('../images/game/arbre.png');
        tree.width = 30;
        tree.height = 30;
        tree.position.set(Math.random() * app.screen.width, Math.random() * app.screen.height);
        trees.push(tree);

        app.stage.addChild(tree);
    }
}

const initDetectionCircle = () => {
    // Initialiser le cercle de détection
    detectionCircle = new PIXI.Graphics();

    detectionCircle.x = robot.x;
    detectionCircle.y = robot.y;
    detectionCircle.beginFill(0xFFFFFF, 0.2);
    detectionCircle.drawCircle(0, 0, detectionRadius);
    detectionCircle.endFill();
    app.stage.addChild(detectionCircle);
}

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
        checkDetection();
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
    detectionCircle.x = robot.x;
    detectionCircle.y = robot.y;
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

const checkDetection = () => {
    detectionCircle.x = robot.x + robot.width / 2;
    detectionCircle.y = robot.y + robot.height / 2;
    for (let i = 0; i < trees.length; i++) {
        let tree = trees[i];
        let distance = Math.sqrt(Math.pow(tree.x - detectionCircle.x, 2) + Math.pow(tree.y - detectionCircle.y, 2));
        if (distance < detectionRadius + tree.width / 2) {
        }
    }
}

const initAll = () => {
    // initConstant();
    initApp();
    initRobot();
    initTrees();
    initFruits();
    initDetectionCircle();
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



document.getElementById("submit").addEventListener("click", () => {
    appleAmount = document.getElementById("cherries").value;
    treeAmount = document.getElementById("tree").value;
    detectionRadius = document.getElementById("sensors").value;
    speedFactor = document.getElementById("speed").value;

    changeDetectionCircleRadius(detectionRadius);
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