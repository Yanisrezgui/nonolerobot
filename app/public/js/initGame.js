var app = undefined;
var detectionSensorL = undefined;
var detectionSensorR = undefined;

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

const initDetectionSensorL = () => {
    // Initialiser le cercle de détection
    detectionSensorL = new PIXI.Graphics();

    detectionSensorL.x = robot.x;
    detectionSensorL.y = robot.y;
    const width = 50; // longueur de la base du triangle
    const height = 200; // hauteur du triangle

    const points = [
        new PIXI.Point(0, width / 2), // point A
        new PIXI.Point(-(width / 2), -(height / 2)), // point B
        new PIXI.Point(width / 2, -(height / 2)), // point C
    ];

    const triangle = new PIXI.Polygon(points);

    // Dessiner le polygone sur la scène
    detectionSensorL.beginFill(0xFF0000); // Choisir la couleur de remplissage (rouge)
    detectionSensorL.drawPolygon(triangle);
    detectionSensorL.endFill();
    app.stage.addChild(detectionSensorL);

    detectionSensorL.pivot.set(0, width / 2);
    detectionSensorL.angle = sensorAngle - 15;
}

const initDetectionSensorR = () => {
    // Initialiser le cercle de détection
    detectionSensorR = new PIXI.Graphics();

    detectionSensorR.x = robot.x;
    detectionSensorR.y = robot.y;
    const width = 50; // longueur de la base du triangle
    const height = 200; // hauteur du triangle

    const points = [
        new PIXI.Point(0, width / 2), // point A
        new PIXI.Point(-(width / 2), -(height / 2)), // point B
        new PIXI.Point(width / 2, -(height / 2)), // point C
    ];

    const triangle = new PIXI.Polygon(points);

    // Dessiner le polygone sur la scène
    detectionSensorR.beginFill(0xFF0000); // Choisir la couleur de remplissage (rouge)
    detectionSensorR.drawPolygon(triangle);
    detectionSensorR.endFill();
    app.stage.addChild(detectionSensorR);

    detectionSensorR.pivot.set(0, width / 2);
    detectionSensorR.angle = sensorAngle + 15;
}
