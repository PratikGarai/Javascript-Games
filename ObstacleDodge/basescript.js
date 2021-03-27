var canvas = undefined;
var canvasContext = undefined;

class Player {
    constructor() {
        this.position = 0;
    }
}

function start()
{
	canvas = document.getElementById("myCanvas");
	canvasContext = canvas.getContext("2d");
	mainLoop();
}

function update()
{
	// pass
}

function draw()
{
	// pass
}

function mainLoop()
{
	canvasContext.fillStyle = "blue";
	canvasContext.fillRect(0,0, canvas.width, canvas.height);
	update();
	draw();
	window.setTimeout(mainLoop, 1000/60);
}

document.addEventListener('DOMContentLoaded', start);
