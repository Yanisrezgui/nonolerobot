var app = undefined;
var detectionCircle = undefined;

const robot = new PIXI.Sprite.from('../images/game/robot.png');

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