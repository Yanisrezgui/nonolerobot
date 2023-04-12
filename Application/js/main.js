function demo_init() {

	// check for WebGL

	let type = "WebGL";
	if (!PIXI.utils.isWebGLSupported()) {
		type = "canvas";
	}
	PIXI.utils.sayHello(type);

	// Create a Pixi Application

	app = new PIXI.Application({
		width: window.innerWidth * 2 / 4,      	// default: 800
		height: window.innerHeight * 3 / 4, 			// default: 600
		antialias: true,    					// default: false
		transparent: false, 					// default: false
		resolution: 1,      					// default: 1
		//autoResize: true
	});

	// Load ressources (images for sprites)

	PIXI.Loader.shared
		.add('robot', "../assets/nono-small.png")
		.add('cherry', "../assets/cherry.png")
		.add('obstacle', "../assets/obstacle.png")
		.load((loader, resources) => {

			//make sprites 

			textures.robot = resources.robot.texture;
			textures.cherry = resources.cherry.texture;
			textures.obstacle = resources.obstacle.texture;


			// when finished loading images, start everyting else

			demo_start();

		});
}

function demo_start() {

	// Add the canvas (app.view) to the HTML document
	window.onresize = function () {
		let w = window.innerWidth * 2 / 3;
		let h = window.innerHeight;

		//this part resizes the canvas but keeps ratio the same
		app.view.style.width = w + "px";
		app.view.style.height = h + "px";

		//this part adjusts the ratio:
		app.resize(w, h);
	}

	document.getElementById("carte").appendChild(app.view);


	// Set the background

	app.renderer.backgroundColor = 0x000000;

	const herbe = new PIXI.Sprite.from('../assets/herbe.png')
	app.stage.addChild(herbe)

	herbe.width = window.innerWidth
	herbe.height = window.innerHeight
	herbe.opacity = 0.5

	if (!debug) {

		// Add food and a robot 
		make_cherries(num_cherries, app.stage);
		make_robot(app.stage);
		make_obstacle(num_obstacles, app.stage);

	}
	else {
		//DEBUG

		let obj = new PIXI.Graphics();
		obj.beginFill(0xff0000);
		obj.drawRect(0, 0, 100 + sensor_range * 0.5, 100 + 20);
		app.stage.addChild(obj);
		obj = new PIXI.Graphics();
		obj.beginFill(0x0000ff);
		obj.drawRect(0, 0, 100, 100);
		app.stage.addChild(obj);

		let cherry = new Cherry(0, 100 + sensor_range * 0.5, 120, 0);
		cherries.push(cherry);
		app.stage.addChild(cherry);

		let obst = new Obstacle(0, 100 + sensor_range * 0.5, 80, 0);
		obstacles.push(obst);
		app.stage.addChild(obst);

		nono = new Robot(100, 100, 0, sensor_range_default);
		app.stage.addChild(nono);

	}
	paused = true;

	app.ticker.add((delta) => game_loop(delta));
	//app.ticker.stop();

	// Add the event to the button
	init_events();

}

function init_events() {
	document.getElementById("nn-neuronnes").innerHTML = get_nn_parameter();
	let start = document.querySelector("#start");
	start.onclick = function () {
		if (!paused) {
			nono.set_nn_parameter(get_nn_parameter())
			//app.ticker.start();

			// change icon of button
			start.classList.remove("bi-pause-circle");
			start.classList.add('bi-play-circle');

		} else {
			nono.set_nn_parameter(get_nn_parameter())
			//app.ticker.stop();
			//change icon of button
			start.classList.remove("bi-play-circle");
			start.classList.add('bi-pause-circle')
		}
		paused = !paused;
	}

	//console.log(nono.sensor_range);
	document.getElementById("reset").addEventListener("click", () => {
		if (sensor_range_default != sensor_range) {
			app.stage.removeChild(nono);
			nono = new Robot(100, 100, 0, sensor_range_default);
			app.stage.addChild(nono);
			let vision = document.getElementById("vision");
			vision.value = 100;

		} else {
			app.stage.removeChild(nono);
			nono = new Robot(100, 100, 0, sensor_range_default);
			app.stage.addChild(nono);
		}

		nono.reset();

		for (let i = 0; i < num_cherries; i++) {
			cherries[i].relocate();
		}
		for (let i = 0; i < num_obstacles; i++) {
			obstacles[i].relocate();
		}

		NonoLife = 101
		elapsed = 0;
		tics = 0;
		paused = false;


	})

	document.getElementById("update").addEventListener("click", () => {
		app.stage.removeChild(nono);
		nono = new Robot(nono.getCoord()[0], nono.getCoord()[1], nono.getCoord()[2], nono.reset_sensor());
		app.stage.addChild(nono);
		nono.set_nn_parameter(get_nn_parameter());
		document.getElementById("nn-neuronnes").innerHTML = get_nn_parameter();
	})

}


function game_loop(delta) {

	if (!paused) {
		// update time and tics
		let dt = delta / 60;
		elapsed += dt;
		tics++;
		let currentTime = elapsed / 4;
		//console.log(elapsed);
		let totalTime = 100;
		let rate = currentTime / totalTime;
		//document.querySelector("#battery").style.width = rate * 400 + "px"
		//document.querySelector("#pointer").style.left =  rate * 400 + "px"


		// robot sens/ act loop
		if (!debug && (tics % act_rate) == 0) {

			// read sensors
			let sensors = nono.read_sensors();
			//console.log(sensors);
			let motor;
			// compute controller
			motor = nono.nono_controller(sensors);
			nono.move(motor[0], motor[1], dt);


		}


		// debugging stuff  move robot and then stop
		if (debug && (tics % act_rate) == 0 && tics < 100) {

			let sensors = nono.read_sensors();
			//let motor = [0, 0]
			let motor = nono.nono_controller(sensors)
			nono.move(motor[0], motor[1], dt);

			console.log(sensors);
		}
	}
}




let NonoLife = 101;

// déclaration d'une fonction pour faire perdre de la vie à Nono
function LoseLife() {
	// vérification si le jeu n'est pas en pause
	if (NonoLife < 1) {
		app.stop();
		return
	}
	if (!paused) {
		// soustraire 1 de la vie de Nono
		NonoLife--;
		// mettre à jour la barre de vie de Nono dans le HTML
		document.getElementById('myBar').style.width = NonoLife + '%';
		document.getElementById('myBar').innerHTML = NonoLife + '%';
	}
}

// appel de la fonction LoseLife toutes les 2 secondes
setInterval(LoseLife, 2000);


