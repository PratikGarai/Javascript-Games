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
    body : undefined,
    direction : 1,
} 

var direction_mapper = {
    1 : [0, -1],        // up
    2 : [1, 0],         // right
    3 : [0, 1],         // down
    4 : [-1, 0]         // left
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
            0,
            0,
            canvas.width,
            canvas.height
        );

    canvasContext.fillStyle = "black";
    canvasContext
        .fillRect(
            0,
            0,
            canvas.width, 
            canvas.height
        );
    
        Snake.head_x = 20;
        Snake.head_y = 20;
        Snake.body = [];
    
    setTimeout(()=> console.log("Started"), 1000);
}

const update = () => {
    Snake.head_x = Snake.head_x+direction_mapper[Snake.direction][0];
    Snake.head_y = Snake.head_y+direction_mapper[Snake.direction][1];

    if(Snake.head_x>=rows)
        Snake.head_x = 0;
    if(Snake.head_y>=cols)
        Snake.head_y = 0;
    if(Snake.head_x<0)
        Snake.head_x = rows-1;
    if(Snake.head_y<0)
        Snake.head_y = cols-1;
}

const draw = () => {
    canvasContext.fillStyle = "black";
    canvasContext
        .fillRect(
            0,
            0,
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

const keyHandler = (e) => {
    // W : 119
    // S : 115
    // A : 97
    // D : 100
    switch(e.keyCode)
    {
        case 119 :
            Snake.direction = 1;
            break;
        case 115 :
            Snake.direction = 3;
            break;
        case 97 :
            Snake.direction = 4;
            break;
        case 100 :
            Snake.direction = 2;
            break;
    }
}

const mainLoop = () => {
    update();
    draw();
    window.setTimeout(mainLoop, 100);
}

document.addEventListener('DOMContentLoaded', start);
document.addEventListener("keypress", keyHandler, true);