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
});

function loop(delta) {
    let minDistance = Number.MAX_VALUE;
    let closestApple;
    
    // trouver la pomme la plus proche
    for (let i = 0; i < apples.length; i++) {
        let distance = distanceBetween(robot, apples[i]);
        if (distance < minDistance) {
            minDistance = distance;
            closestApple = apples[i];
        }
    }
    
    // se diriger vers la pomme la plus proche
    if (closestApple) {
        let angle = angleBetween(robot, closestApple);
        robot.y += Math.sin(angle) * 2;
        robot.x += Math.cos(angle) * 2;
    }
    
    // éviter les arbres
    for (let i = 0; i < trees.length; i++) {
        let distance = distanceBetween(robot, trees[i]);
        if (distance < 50) {
            let angle = angleBetween(robot, trees[i]);
            robot.y -= Math.sin(angle) * 5;
            robot.x -= Math.cos(angle) * 5;
        }
    }
    
    // s'assurer que le robot reste sur la carte
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
}

// calculer la distance entre deux objets
function distanceBetween(sprite1, sprite2) {
    let dx = sprite1.x - sprite2.x;
    let dy = sprite1.y - sprite2.y;
    return Math.sqrt(dx * dx + dy * dy);
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