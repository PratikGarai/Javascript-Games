var canvas = undefined;
var canvasContext = undefined;

let datas;
let height;
let width;
let player;
let obstacle;
let env;
let isObs = 0;
const obsNames = ['wall', 'cacti', 'bird', 'trench'];

const obsVel = 20; 
const gravity = 5;

class Environment {
	constructor()
	{
		this.obstacle = undefined; 
	}

	update(){
		if(isObs==0)
		{
			this.obstacle = new Obstacle(obsNames[Math.floor(Math.random()*obsNames.length)]);
			isObs = 1;
		}
		this.obstacle.x -= obsVel;
		if((this.obstacle.x+this.obstacle.w/2)<0){
			isObs = 0;
		}
	}

	draw(){
		this.obstacle.draw();
	}
}

class Player {
	constructor(base_x, base_y, w, h, env) {
		this.bx = base_x;
		this.by = base_y;
		this.w = w;
		this.h = h;
		this.v = 0;
		this.env = env;
	}

	draw() {
		canvasContext.fillStyle = "cyan";
		canvasContext.fillRect(this.bx-this.w/2, this.by-this.h, this.w, this.h);
	}

	move() {
		if(this.v==0)
		{
			switch(this.env.obstacle.type)
			{
				case 'wall':
					if(this.env.obstacle.x>=this.bx+25 && this.env.obstacle.x<=this.bx+100)
						this.superJump();
					break;
				case 'cacti':
					if(this.env.obstacle.x>=this.bx+25 && this.env.obstacle.x<=this.bx+100)
						this.jump();
					break;
				case 'trench':
					if(this.env.obstacle.x>=this.bx+50 && this.env.obstacle.x<=this.bx+100)
						this.miniJump();
					break;
				case 'bird':
					if(this.env.obstacle.x>=this.bx+50 && this.env.obstacle.x<=this.bx+100 && this.h==50)
						this.h -= 15;
					if(this.env.obstacle.x<this.bx-25 && this.h!=50)
						this.h += 15;
			}
		}
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
		this.type = type;
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

	env = new Environment();
	player = new Player(30, height-100, 40, 50, env);
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
	env.update();
	player.move();
}

function draw()
{
	canvasContext.fillStyle = "white";
	canvasContext.fillRect(0,0, width, height);
	drawGround();
	player.draw();
	env.draw();
}

function mainLoop()
{
	update();
	draw();
	window.setTimeout(mainLoop, 1000/27);
}

document.addEventListener('DOMContentLoaded', start);