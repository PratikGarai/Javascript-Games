"use strict";

var Game = {
    canvas : undefined,
    canvasContext : undefined,
    rectangle_x : 0,
    rectangle_y : 0,
    rectangle_h : 10,
    rectangle_w : 10
};

Game.start = () => {
    Game.canvas = document.getElementById("myCanvas");
    Game.canvasContext = Game.canvas.getContext("2d");
    Game.mainLoop();
}

Game.update = () => {
    Game.rectangle_x += 1;
    Game.rectangle_y += 1;
}

Game.draw = () => {
    Game
        .canvasContext
        .clearRect(
            0,
            0, 
            Game.canvas.width, 
            Game.canvas.height
        );

    Game.canvasContext.fillStyle = "blue";
    Game
        .canvasContext
        .fillRect(
            Game.rectangle_x, 
            Game.rectangle_y, 
            Game.rectangle_w, 
            Game.rectangle_h
        );
}

Game.mainLoop = () => {
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000/60);
}

document.addEventListener('DOMContentLoaded', Game.start);