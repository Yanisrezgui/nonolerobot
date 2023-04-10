class Sensor extends PIXI.Graphics {
    constructor (x, y, width, height, anleSensor) {
        // position : x,y
        // oriantation : r (radians)
        // max range : range  
        // angle of view : fov (radians) 

        super();
        this.x = x;
        this.y = y;
        this.beginFill(0xFFFFFF, 0.2);
        this.triangle = new PIXI.Polygon([
            new PIXI.Point(0, width / 2),
            new PIXI.Point(-(width / 2), -(height / 2)),
            new PIXI.Point(width / 2, -(height / 2)),
        ]);

        this.drawPolygon(this.triangle);
        this.name = "Sensor";
        this.pivot.set(0, width / 2);
        this.angle = anleSensor
        this.endFill();
    }
}