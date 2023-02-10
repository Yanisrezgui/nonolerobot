app = new PIXI.Application({
    width: 1000,
    height: 700,
    antialias: true,
    transparent: false,
    resolution: 1,
});

app.renderer.view.style.position = 'absolute'
document.body.appendChild(app.view);

const herbe = new PIXI.Sprite.from('../images/herbe.png')
app.stage.addChild(herbe)

herbe.width = window.innerWidth
herbe.height = window.innerHeight
herbe.opacity = 0.5

const robot = new PIXI.Sprite.from('../images/robot.png')
app.stage.addChild(robot)
robot.width = 30
robot.height = 30
robot.position.set(200, 200)
robot.anchor.set(0.5)

// Ajoutez un tableau pour les pommes
const apples = [];

// Ajoutez un compteur pour les pommes
let appleCounter = 0;

// Ajoutez un intervalle pour ajouter une pomme toutes les 2 secondes
setInterval(() => {
    if (appleCounter < 20) {
        const apple = new PIXI.Sprite.from('../images/pomme.png');
        apple.width = 20;
        apple.height = 20;
        apple.position.set(Math.random() * app.screen.width, Math.random() * app.screen.height);
        apple.anchor.set(0.5);
        apples.push(apple);
        app.stage.addChild(apple);
        appleCounter++;
        console.log(appleCounter)
    }
}, 500);

app.ticker.add(delta => {
    loop(delta);
    checkCollision();
    checkDetection();
});

// Initialise la direction actuelle du robot
let currentDirection = {x: -1, y: 1};

// Initialiser le cercle de détection
const detectionRadius = 50;
const detectionCircle = new PIXI.Graphics();
detectionCircle.x = robot.x;
detectionCircle.y = robot.y;
detectionCircle.beginFill(0xFFFFFF, 0.2);
detectionCircle.drawCircle(0, 0, detectionRadius);
detectionCircle.endFill();
app.stage.addChild(detectionCircle);

function loop(delta) {
    let speedFactor = 2;

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
        robot.y = window.innerHeight;
    }

    // Mettre à jour les coordonnées du cercle de détection
    detectionCircle.x = robot.x;
    detectionCircle.y = robot.y;
}

// Calcule la distance entre deux objets
function calculateDistance(obj1, obj2) {
    let xDiff = obj1.x - obj2.x;
    let yDiff = obj1.y - obj2.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

// calculer l'angle entre deux objets
function angleBetween(sprite1, sprite2) {
    return Math.atan2(sprite2.y - sprite1.y, sprite2.x - sprite1.x);
}

// Ajoutez une fonction pour vérifier la collision entre le robot et les pommes
function checkCollision() {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (robot.x <= (apple.x + apple.width) && (robot.x + robot.width) >= apple.x &&
            robot.y <= (apple.y + apple.height) && (robot.y + robot.height) >= apple.y) {
            app.stage.removeChild(apple);
            apples.splice(i, 1);
            appleCounter--
        }
    }
}

function checkDetection() {
    detectionCircle.x = robot.x + robot.width / 2;
    detectionCircle.y = robot.y + robot.height / 2;
    for (let i = 0; i < trees.length; i++) {
        let tree = trees[i];
        let distance = Math.sqrt(Math.pow(tree.x - detectionCircle.x, 2) + Math.pow(tree.y - detectionCircle.y, 2));
        if (distance < detectionRadius + tree.width / 2) {
            console.log("Il y a un arbre devant le robot !");
        }
    }
}

const trees = [];

// Initialiser les 20 arbres
for (let i = 0; i < 20; i++) {
    const tree = new PIXI.Sprite.from('../images/arbre.png');
    app.stage.addChild(tree);
    tree.width = 30;
    tree.height = 30;
    tree.position.set(Math.random() * app.screen.width, Math.random() * app.screen.height);
    trees.push(tree);
}