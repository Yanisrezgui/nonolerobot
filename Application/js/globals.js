const robot_speed = 500;
const act_rate    = 5;

const sensor_range_default = 100;
let sensor_range   = 150;
const sensor_fov     = Math.PI/6;
const sensor_angles  = [ -Math.PI/8, Math.PI/8];

let paused = false;
const bias_value = 1;

const num_cherries  = 130;
const num_obstacles =  25;
      
let app;

const textures     = {};
const cherries     = [];
const obstacles    = [];

let nono = null;

let elapsed = 0.0;
let tics    = 0;
let cherriesScore = 0;
let battery   = 100;

let statistics = {
    cherries: [],
    obstacles: []
};

const debug = false; // fix the number of cherries to 1

