const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true
});

app.renderer.resize(window.innerWidth, window.innerHeight)
app.renderer.view.style.position = 'absolute'
document.body.appendChild(app.view);

const Graphics = PIXI.Graphics

const rectangle = new Graphics();
rectangle.beginFill(0xAA33BB)
    .lineStyle(4, 0xFFEA00, 1)
    .drawRect(200, 200, 100, 120)
    .endFill();

app.stage.addChild(rectangle)

const style = new PIXI.TextStyle({
    fontFamily: 'Montserrat',
    fontSize: 48,
    fill: 'deepskyblue',
    stroke: '#ffffff',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowDistance: 10,
    dropShadowAngle: Math.PI / 2,
    dropShadowBlur: 4,
    dropShadowColor: '#000000'
});

const mytext = new PIXI.Text('hello World', style)

app.stage.addChild(mytext)
mytext.text = 'text changed'