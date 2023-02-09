app = new PIXI.Application({
    width: window.innerWidth * 2 / 3,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    resolution: 1,
});

app.renderer.view.style.position = 'absolute'
document.body.appendChild(app.view);

const herbe = new PIXI.Sprite.from('../images/herbe.png')
app.stage.addChild(herbe)

herbe.width = window.innerWidth * 2 / 3
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
    robot.y += 1;
    robot.x -= 1;
    // on verifie que le robot reste sur la carte
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