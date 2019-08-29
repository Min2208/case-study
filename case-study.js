//
//
//

const GAMEBOARD_WIDTH = 800;
const GAMEBOARD_HEIGHT = 500;

const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";

const DEFAULT_CAR_X_POSITION = 450;
const DEFAULT_CAR_Y_POSITION = 250;
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

let interval = 0;
let interval1 = 0;
let interval2 = 0;
let score = 0;
let xDiamond = null;
let yDiamond = null;
let xBoom = null;
let yBoom = null;

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
                if (this.yPosition <= GAMEBOARD_HEIGHT - this.speed - 35) {
                    this.yPosition += this.speed;
                }
                break;
            case ORIENTATION_LEFT:
                if (this.xPosition >= this.speed) {
                    this.xPosition -= this.speed;
                }
                break;
            case ORIENTATION_RIGHT:
                if (this.xPosition <= GAMEBOARD_WIDTH - this.speed - 35) {
                    this.xPosition += this.speed;
                }
                break;
        }
        this.buildImage();

    };

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
    this.xClear = this.xPosition;
    this.yClear = this.yPosition;
    this.showDiamond = function () {
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        let image = new Image();
        ctx.clearRect(xDiamond, yDiamond, 50, 28);
        this.xPosition = Math.floor((Math.random() * 7) * 100);
        this.yPosition = Math.floor((Math.random() * 3) * 100) + 130;
        let xPosition = this.xPosition;
        let yPosition = this.yPosition;
        xDiamond = xPosition;
        yDiamond = yPosition;
        this.xClear = xPosition;
        this.yClear = yPosition;
        image.onload = function () {
            ctx.drawImage(image, xPosition, yPosition);
        };
        image.src = 'diamond.png';

    };
    this.removeDiamond = function () {
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.clearRect(xDiamond, yDiamond, 50, 28);
        xDiamond = null;
        yDiamond = null;
    }

}

function Boom() {
    this.xPosition = 0;
    this.yPosition = 0;
    for (let i = 0; i < 15; i++) {
        X_RANDOM_WALL.push(Math.floor(Math.random() * 8) * 100);
        Y_RANDOM_WALL.push(Math.floor(Math.random() * 4) * 100);
    }
    this.showBoom = function () {
        console.log("show");
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        for (let i = 0; i < X_RANDOM_BOOM.length; i++) {

            let image = new Image();
            this.xPosition = X_RANDOM_BOOM[i];
            this.yPosition = Y_RANDOM_BOOM[i];
            let xPosition = this.xPosition;
            let yPosition = this.yPosition;
            this.xClear = this.xPosition;
            this.yClear = this.yPosition;
            image.onload = function () {
                ctx.drawImage(image, xPosition, yPosition);
            };
            image.src = 'boom1.png';
        }
    };
    this.removeBoom = function (x, y) {
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.clearRect(x, y, boomWidth, boomHeight);
        this.showBoom();
    };
    this.randomBoom = function () {
        X_RANDOM_BOOM.push(Math.floor(Math.random() * 8) * 100);
        Y_RANDOM_BOOM.push(Math.floor(Math.random() * 3) * 100 + 130);

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
}

function Crash() {
    this.crash = function () {
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
            if (carLeft <= boomRight && carRight >= boomLeft && carUp <= boomDown && carDown >= boomUp) {
                clearInterval(interval1);
                clearInterval(interval2);
                return true;
            }
        }
        for (let i = 0; i < X_RANDOM_WALL.length; i++) {
            wallLeft = X_RANDOM_WALL[i];
            wallRight = X_RANDOM_WALL[i] + wallWidth;
            wallUp = Y_RANDOM_WALL[i];
            wallDown = Y_RANDOM_WALL[i] + wallHeight;
            if (carLeft <= wallRight && carRight >= wallLeft && carUp <= wallDown && carDown >= wallUp) {
                clearInterval(interval1);
                clearInterval(interval2);
                return true;
            }
        }
        if (carLeft <= diamondRight && carRight >= diamondLeft && carUp <= diamondDown && carDown >= diamondUp) {
            diamond.removeDiamond();
            score += 500;
            xBoom = X_RANDOM_BOOM[0];
            yBoom = Y_RANDOM_BOOM[0];
            X_RANDOM_BOOM.splice(0, 1);
            Y_RANDOM_BOOM.splice(0, 1);
            boom.removeBoom(xBoom, yBoom);
            // boom.removeBoom(0);
            console.log(X_RANDOM_BOOM);
            console.log(X_RANDOM_WALL);
            console.log(score);
        }
    }
}

function GameBoard(car, boom, diamond, crash) {

    this.start = function () {
        window.addEventListener("keydown", this.moveCar);
        car.show();
        boom.showBoom();
        interval2 = setInterval(function () {
            boom.randomBoom();
            boom.showBoom();
            diamond.showDiamond();
        }, 5000);
        interval1 = setInterval(function () {
            boom.showWall();
            gameBoard.gameOver();
        }, 100);
    };

    this.gameOver = function () {
        document.getElementById('score').innerHTML = score;
        document.getElementById('boom').innerHTML = X_RANDOM_BOOM.length;
        document.getElementById('speed').innerHTML = car.speed + 80 + " km/h";
        if (crash.crash()) {
            if (score > localStorage.getItem("Hight score")) {
                localStorage.setItem("Hight score", score);
            }
            confirm("Game Over!!! :" + "Your score: " + score);
            return;
        }
        if (X_RANDOM_BOOM.length == 10) {
            if (score > localStorage.getItem("Hight score")) {
                localStorage.setItem("Hight score", score);
            }
            confirm("Game Over!!! :" + "Your score: " + score);
            return;
        }
    };
    this.moveCar = function (event) {
        let orientation = 0;
        switch (event.keyCode) {
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
                    if (crash.crash()) {
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
                    if (crash.crash()) {
                        clearInterval(interval);
                    }
                }, 100);
            }
        }
    };
}

document.getElementById('hightscore').innerHTML = "Hight score: " + localStorage.getItem('Hight score');
let crash = new Crash();
let diamond = new Diamond();
let car = new Car();
let boom = new Boom();
let gameBoard = new GameBoard(car, boom, diamond, crash);

