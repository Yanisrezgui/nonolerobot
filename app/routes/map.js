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


const char1sprite = new PIXI.Sprite.from('../images/robot.png')

app.stage.addChild(char1sprite)

char1sprite.width = 50
char1sprite.height = 50


/* char1sprite.x = 400
char1sprite.y = 400 */
char1sprite.position.set(500, 400)
char1sprite.anchor.set(0.5, 0.5)

app.ticker.add(delta => loop(delta))
function loop(delta) {
    /* char1sprite.x += 1
    char1sprite.y += -0.4 */
/*     char1sprite.rotation += 0.01
 */}

char1sprite.interactive = true;
char1sprite.on('pointerdown', function () {
    char1sprite.position.set(Math.floor(window.innerWidth * Math.random()), window.innerHeight * Math.random())
})