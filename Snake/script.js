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
    food_x : undefined, 
    food_y : undefined
} 

var direction_mapper = {
    1 : [0, -1],        // up
    2 : [1, 0],         // right
    3 : [0, 1],         // down
    4 : [-1, 0]         // left
}

const generateFood = () => {
    Snake.food_x = Math.floor(Math.random()*rows);
    Snake.food_y = Math.floor(Math.random()*cols);
}

const start = () => {
    canvas = document.getElementById("myCanvas");
    canvasContext = canvas.getContext("2d");
    init();
    mainLoop();
}

const init = () => {
    generateFood();

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
    
    drawPixel(col2, Snake.head_x,Snake.head_y);
    drawPixel(col3, Snake.food_x,Snake.food_y);
    
    setTimeout(()=> console.log("Started"), 1000);
}

const update = () => {

    Snake.body.unshift([Snake.head_x, Snake.head_y]);

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

    Snake.body.forEach(bod => {
        if(Snake.head_x==bod[0] && Snake.head_y==bod[1])
        {
            console.log("Lost!");
            init();
        }
    });

    if(Snake.head_x==Snake.food_x && Snake.head_y==Snake.food_y)
    {
        generateFood();
    }
    else 
    {
        Snake.body.pop();
    }
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

    drawPixel(col2, Snake.head_x,Snake.head_y);

    Snake
        .body
        .forEach(bod => {
            drawPixel(col1, bod[0], bod[1]);
        });

    drawPixel(col3, Snake.food_x,Snake.food_y);
}

const drawPixel = (col, x, y) => {
    canvasContext.fillStyle = col;
    canvasContext.fillRect(x*size+1,y*size+1,size-1,size-1);
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