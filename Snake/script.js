var canvas = undefined;
var canvasContext = undefined;

const size = 20;
const rows = 40;
const cols = 40;

const col1 = "#79e332";      // body
const col2 = "#0e3fed";      // head
const col3 = "#ed460e";      // food

var Snake = {
    head_x : undefined,
    head_y : undefined,
    body : undefined
} 

const start = () => {
    canvas = document.getElementById("myCanvas");
    canvasContext = canvas.getContext("2d");
    init();
    mainLoop();
}

const init = () => {
    canvasContext
        .clearRect(
            10,
            10,
            canvas.width,
            canvas.height
        );

    canvasContext.fillStyle = "black";
    canvasContext
        .fillRect(
            10,
            10,
            canvas.width, 
            canvas.height
        );
    
        Snake.head_x = 20;
        Snake.head_y = 20;
        Snake.body = [];
    
    setTimeout(()=> console.log("Started"), 1000);
}

const update = () => {
    canvasContext.fillStyle = "black";
    canvasContext
        .fillRect(
            10,
            10,
            canvas.width, 
            canvas.height
        );

    canvasContext.fillStyle = col2;
    canvasContext
        .fillRect(
            Snake.head_x*size,
            Snake.head_y*size,
            size,
            size
        )

    canvasContext.fillStyle = col1;
    Snake
        .body
        .forEach(bod => {
            canvasContext
                .fillRect(
                    bod[0]*size,
                    bod[1]*size,
                    size,
                    size
                );
    });
}

const draw = () => {
}

const mainLoop = () => {
    update();
    draw();
    window.setTimeout(mainLoop, 1000/60);
}

document.addEventListener('DOMContentLoaded', start);