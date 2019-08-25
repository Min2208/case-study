let interval = 0;
const GAMEBOARD_WIDTH = 800;
const GAMEBOARD_HEIGHT = 500;

const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";

const DEFAULT_CAR_X_POSITION = 100;
const DEFAULT_CAR_Y_POSITION = 100;
const DEFAULT_CAR_ORIENTATION = ORIENTATION_UP;
const DEFAULT_CAR_SPEED = 10;

let X_RANDOM_BOOM = [];
let Y_RANDOM_BOOM = [];
let X_RANDOM_WALL = [];
let Y_RANDOM_WALL = [];

let boomWidth = 30;
let boomHeight = 32;
let wallWidth = 120;
let wallHeight = 26;
let diamondWidth = 50;
let diamondHeight = 28;
let carSize = 20;

let score = 0;
let xDiamond = 0;
let yDiamond = 0;

function Car() {
    this.xPosition = DEFAULT_CAR_X_POSITION;
    this.yPosition = DEFAULT_CAR_Y_POSITION;
    this.orientation = DEFAULT_CAR_ORIENTATION;
    let xClear = this.xPosition;
    let yClear = this.yPosition;
    this.speed = DEFAULT_CAR_SPEED;

    this.buildImage = function () {
        this.image = this.orientation + '.png';
    };
    this.buildImage();

    this.move = function () {
        switch (this.orientation) {
            case ORIENTATION_UP:
                if (this.yPosition >= this.speed) {
                    this.yPosition -= this.speed;
                }
                break;
            case ORIENTATION_DOWN:
                if (this.yPosition <= GAMEBOARD_HEIGHT - this.speed) {
                    this.yPosition += this.speed;
                }
                break;
            case ORIENTATION_LEFT:
                if (this.xPosition >= this.speed) {
                    this.xPosition -= this.speed;
                }
                break;
            case ORIENTATION_RIGHT:
                if (this.xPosition <= GAMEBOARD_WIDTH - this.speed) {
                    this.xPosition += this.speed;
                }
                break;
        }
        this.buildImage();

    };

    this.buildImage();

    this.show = function () {
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        let image = new Image();
        ctx.clearRect(xClear, yClear, 35, 35);
        let xPosition = this.xPosition;
        let yPosition = this.yPosition;
        xClear = xPosition;
        yClear = yPosition;


        image.onload = function () {
            ctx.drawImage(image, xPosition, yPosition);
        };
        image.src = this.image;
    };

}

function Diamond() {
    this.xPosition = 0;
    this.yPosition = 0;
    let xClear = this.xPosition;
    let yClear = this.yPosition;
    this.showDiamond = function () {
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        let image = new Image();
        ctx.clearRect(xClear, yClear, 50, 28);
        this.xPosition = Math.floor(Math.random() * (GAMEBOARD_WIDTH - 100));
        this.yPosition = Math.floor(Math.random() * (GAMEBOARD_HEIGHT - 100));
        let xPosition=this.xPosition;
        let yPosition = this.yPosition;
        xDiamond = xPosition;
        yDiamond = yPosition;
        xClear = xPosition;
        yClear = yPosition;
        image.onload = function () {
            ctx.drawImage(image, xPosition, yPosition);
        };
        image.src = 'diamond.png';

    };
    this.removeDiamond=function () {
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.clearRect(xDiamond, yDiamond, 50, 28);
        this.showDiamond();
    }

}

function Boom() {
    this.xPosition = 0;
    this.yPosition = 0;

    for (let i = 0; i < 10; i++) {
        X_RANDOM_WALL.push(Math.floor(Math.random() * 8) * 100);
        Y_RANDOM_WALL.push(Math.floor(Math.random() * 5) * 100);

    }
    for (let i = 0; i < 5; i++) {
        X_RANDOM_BOOM.push(Math.floor(Math.random() * 8) * 100);
        Y_RANDOM_BOOM.push(Math.floor(Math.random() * 5) * 100);

    }
    this.showBoom = function () {
        for (let i = 0; i < X_RANDOM_BOOM.length; i++) {
            let ctx = document.getElementById('gameCanvas').getContext('2d');
            ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
            let image = new Image();
            this.xPosition = X_RANDOM_BOOM[i];
            this.yPosition = Y_RANDOM_BOOM[i];
            let xPosition = this.xPosition;
            let yPosition = this.yPosition;
            image.onload = function () {
                ctx.drawImage(image, xPosition, yPosition);
            };
            image.src = 'boom1.png';
        }
    };
    this.showWall = function () {
        for (let i = 0; i < X_RANDOM_WALL.length; i++) {
            let ctx = document.getElementById('gameCanvas').getContext('2d');
            let image = new Image();
            this.xPosition = X_RANDOM_WALL[i];
            this.yPosition = Y_RANDOM_WALL[i];
            let xPosition = this.xPosition;
            let yPosition = this.yPosition;
            image.onload = function () {
                ctx.drawImage(image, xPosition, yPosition);
            };
            image.src = 'wall.png';
        }
    };

    this.randomBoom = function () {
        let xPosition = Math.floor((Math.random() * 80) * 10);
        let yPosition = Math.floor((Math.random() * 50) * 10);
        X_RANDOM_BOOM.push(xPosition);
        Y_RANDOM_BOOM.push(yPosition);


    };
    this.removeBoom = function (x, y) {
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        let image = new Image();
        ctx.clearRect(x, y, boomWidth, boomHeight);
        this.showBoom();
    };

}

function crash() {
    let carLeft = car.xPosition;
    let carRight = car.xPosition + carSize;
    let carUp = car.yPosition;
    let carDown = car.yPosition + carSize;
    let boomLeft = 0;
    let boomRight = 0;
    let boomUp = 0;
    let boomDown = 0;
    let diamondLeft = xDiamond;
    let diamondRight = xDiamond + diamondWidth;
    let diamondUp = yDiamond;
    let diamondDown = yDiamond + diamondHeight;
    let wallLeft = 0;
    let wallRight = 0;
    let wallUp = 0;
    let wallDown = 0;

    for (let i = 0; i < X_RANDOM_BOOM.length; i++) {
        boomLeft = X_RANDOM_BOOM[i];
        boomRight = X_RANDOM_BOOM[i] + boomWidth;
        boomUp = Y_RANDOM_BOOM[i];
        boomDown = Y_RANDOM_BOOM[i] + boomHeight;
        if (carLeft > boomRight || carRight < boomLeft || carUp > boomDown || carDown < boomUp) {

        } else {
            return true;
        }

    }
    for (let i = 0; i < X_RANDOM_WALL.length; i++) {
        boomLeft = X_RANDOM_WALL[i];
        boomRight = X_RANDOM_WALL[i] + wallWidth;
        boomUp = Y_RANDOM_WALL[i];
        boomDown = Y_RANDOM_WALL[i] + wallHeight;
        if (carLeft > boomRight || carRight < boomLeft || carUp > boomDown || carDown < boomUp) {
        } else {
            return true;

        }

    }
    if (carLeft > diamondRight || carRight < diamondLeft || carUp > diamondDown || carDown < diamondUp) {
        console.log(false);
    } else {
        diamond.removeDiamond();
        boom.showBoom();
        score += 500;
        let i = Math.floor(Math.random() * (X_RANDOM_BOOM.length - 1));
        // boom.removeBoom(X_RANDOM_BOOM[i],Y_RANDOM_BOOM[i]);
        X_RANDOM_BOOM.splice(i, 1);
        Y_RANDOM_BOOM.splice(i, 1);
        boom.showBoom();
        console.log(X_RANDOM_BOOM);
        console.log(X_RANDOM_WALL);
        console.log(score);

    }


}

function GameBoard() {


    this.start = function () {
        window.addEventListener("keydown", gameBoard.moveCar)
        car.show();
        boom.showBoom();
        setInterval(boom.randomBoom, 10000);
        setInterval(boom.showBoom, 10000);
        setInterval(diamond.showDiamond, 10000);
        setInterval(boom.showWall, 100);
        setInterval(this.gameOver, 100);
    };
    this.gameOver = function () {
        document.getElementById('score').innerHTML = score;
        document.getElementById('boom').innerHTML = X_RANDOM_BOOM.length;
        document.getElementById('speed').innerHTML =car.speed + 80 + " km/h";
        if (crash()) {
            alert("Game Over!!! :" + "Your score: " + score);
            return;
        }
        if (X_RANDOM_BOOM.length == 10) {
            alert("Game Over!!! :" + "Your score: " + score);
            return;
        }
    };
    this.moveCar = function (event) {
        let orientation = 0;
        switch (event.which) {
            case 17:
                car.speed -= 5;
                break;
            case 32:
                car.speed += 5;
                break;
            case 37:
                orientation = ORIENTATION_LEFT;
                break;
            case 38:
                orientation = ORIENTATION_UP;
                break;
            case 39:
                orientation = ORIENTATION_RIGHT;
                break;
            case 40:
                orientation = ORIENTATION_DOWN;
                break;
        }
        if (orientation) {
            if (car.orientation !== orientation) {
                car.orientation = orientation;
                if (interval) {
                    clearInterval(interval);
                }
                interval = setInterval(function () {
                    car.move();
                    car.show();
                    gameBoard.gameOver();
                    if (crash()) {
                        clearInterval(interval);
                    }

                }, 100);
            } else {
                if (interval) {
                    clearInterval(interval);
                }
                interval = setInterval(function () {
                    car.move();
                    car.show();
                    gameBoard.gameOver();
                    if (crash()) {
                        clearInterval(interval);
                    }
                }, 100);
            }
        }
    }
}

let diamond = new Diamond();
let car = new Car();
let boom = new Boom();
let gameBoard = new GameBoard();

