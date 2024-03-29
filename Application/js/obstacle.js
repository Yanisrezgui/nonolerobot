function make_obstacle(count, parent) {

    for (let i =0; i<count; i++){
	let obstacle = new Obstacle( i,
				 Math.random() * app.renderer.width,
				 Math.random() * app.renderer.height,
				 Math.random() * Math.PI * 2 );

	obstacles.push( obstacle );
	parent.addChild( obstacle );

    }
}

class Obstacle extends PIXI.Sprite {

    constructor(id, x, y, r) {
	super(textures.obstacle);
	this.id = id;
	this.x = x;
	this.y = y;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.scale.x = .5;
	this.scale.y = .5;
	this.rotation = 0;
	this.name = "Obtacle number "+id;
	this.tagged = false;
    }

	relocate(){
      
		this.x = Math.random() * app.renderer.width;
		this.y = Math.random() * app.renderer.height;
		this.rotation = Math.random() * Math.PI * 2 ;
  
	  }

}


