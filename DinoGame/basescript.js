var canvas = undefined;
var canvasContext = undefined;

let datas;
let height;
let width;
let player;
let obstacle;
let isObs = 0;
const obsNames = ['wall', 'cacti', 'bird', 'trench'];

const obsVel = 20; 
const gravity = 5;

class Player {
	constructor(base_x, base_y, w, h) {
		this.bx = base_x;
		this.by = base_y;
		this.w = w;
		this.h = h;
		this.v = 0;
	}

	draw() {
		canvasContext.fillStyle = "cyan";
		canvasContext.fillRect(this.bx-this.w/2, this.by-this.h, this.w, this.h);
	}

	move() {
		if(this.v>0 && this.by+this.v>height-100){
			this.v = 0;
			this.by = height-100;
		}
		else {
			this.by += this.v;
			this.v += gravity;
		}
	}

	miniJump() {
		this.v = -25;
	}

	jump() {
		this.v = -30;
	}

	superJump() {
		this.v = -40;
	} 
}

class Obstacle {
	constructor(type) {
		const d = datas[type];
		this.x = d.x;
		this.y = d.y;
		this.w = d.w;
		this.h = d.h;
		this.color = d.color;
	}

	draw() {
		canvasContext.fillStyle = this.color;
		canvasContext.fillRect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
	}
}

function start()
{
	canvas = document.getElementById("myCanvas");
	canvasContext = canvas.getContext("2d");
	height = canvas.height;
	width = canvas.width;

	datas = {
		'bird' : {
			x : width,
			y : height-160,
			w : 40,
			h : 40,
			color : "black"
		},
		'wall' : {
			x : width,
			y : height-140,
			w : 40,
			h : 80,
			color : "brown"
		},
		'cacti' : {
			x : width,
			y : height-120,
			w : 40,
			h : 40,
			color : "green"
		},
		'trench' : {
			x : width,
			y : height-90,
			w : 40,
			h : 20,
			color : "blue"
		}
	}

	player = new Player(30, height-100, 40, 50);
	player.miniJump();
	mainLoop();
}

function drawGround () {
	canvasContext.fillStyle = "black";
	canvasContext.beginPath();
	canvasContext.moveTo(0, height-100);
	canvasContext.lineTo(width, height-100);
	canvasContext.stroke();
} 

function update()
{
	if(isObs==0)
	{
		obstacle = new Obstacle(obsNames[Math.floor(Math.random()*obsNames.length)]);
		isObs = 1;
	}
	obstacle.x -= obsVel;
	if((obstacle.x+obstacle.w/2)<0){
		isObs = 0;
	}
	player.move();
}

function draw()
{
	canvasContext.fillStyle = "white";
	canvasContext.fillRect(0,0, width, height);
	drawGround();
	player.draw();
	obstacle.draw();
}

function mainLoop()
{
	update();
	draw();
	window.setTimeout(mainLoop, 1000/35);
}

document.addEventListener('DOMContentLoaded', start);