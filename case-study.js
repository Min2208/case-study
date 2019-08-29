//
//
//

const GAMEBOARD_WIDTH = 900;
const GAMEBOARD_HEIGHT = 700;

const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "down";

const DEFAULT_CAR_X_POSITION = 450;
const DEFAULT_CAR_Y_POSITION = 250;
const DEFAULT_CAR_ORIENTATION = ORIENTATION_UP;
// const DEFAULT_CAR_SPEED = 10;
let carSpeed=0;
let autorun=0;

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
let carSize = 21;

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
    this.speed = carSpeed;

    this.buildImage = function () {
        this.image = this.orientation + '.png';
    };
    this.buildImage();

    this.move = function () {
        console.log(this.speed);
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
        ctx.clearRect(xClear, yClear, 50, 50);
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
        this.xPosition = Math.floor((Math.random() * 8) * 100);
        this.yPosition = Math.floor((Math.random() * 5) * 100) + 130;
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
    for (let i = 0; i < 20; i++) {
        X_RANDOM_WALL.push(Math.floor(Math.random() * 9) * 100);
        Y_RANDOM_WALL.push(Math.floor(Math.random() * 6) * 100);
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
        Y_RANDOM_BOOM.push(Math.floor(Math.random() * 5) * 100 + 130);

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
                clearInterval(interval);
                // location.reload();
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
                clearInterval(interval);
                // location.reload();
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
            console.log(X_RANDOM_BOOM);
            console.log(X_RANDOM_WALL);
            console.log(score);
        }
    }
}

function GameBoard(car, boom, diamond, crash) {
    this.player=null;
    let ctx = document.getElementById('gameCanvas').getContext('2d');
    this.gameLevel=function (level) {
        if (car.speed==0) {
            if (level.value == 1) {
                car.speed = 10;
                autorun = 7000;
                level.style.backgroundColor = "#03a9f4";
                this.player = "easy";

            }
            if (level.value == 2) {
                car.speed = 20;
                autorun = 6000;
                level.style.backgroundColor = "#03a9f4";
                this.player = "medium";
            }
            if (level.value == 3) {
                car.speed = 30;
                autorun = 4500;
                level.style.backgroundColor = "#03a9f4";
                this.player = "hard";
            }
        }
    };

    this.start = function () {
        console.log(carSpeed);
        window.addEventListener("keydown", this.moveCar);
        car.show();
        boom.showBoom();
        interval2 = setInterval(function () {
            boom.randomBoom();
            boom.showBoom();
            diamond.showDiamond();
        }, autorun);
        interval1 = setInterval(function () {
            boom.showWall();
            gameBoard.gameOver();
        }, 100);
    };
    this.newGame=function () {
        location.reload();
    };
    this.gameOver = function () {
        document.getElementById('score').innerHTML = score;
        document.getElementById('boom').innerHTML = X_RANDOM_BOOM.length;
        document.getElementById('speed').innerHTML = car.speed + 80 + " km/h";


        if (crash.crash()) {
            if (score > localStorage.getItem(this.player)) {
                localStorage.setItem(this.player, score);

            }
            ctx.clearRect(0,0,GAMEBOARD_WIDTH,GAMEBOARD_HEIGHT);
            ctx.font = "40px Arial";
            ctx.fillStyle="red";
            ctx.fillText("Game Over ^.^ Your Score: " + score,150,300);

            return;
        }
        if (X_RANDOM_BOOM.length == 5) {
            if (score > localStorage.getItem(this.player)) {
                localStorage.setItem(this.player, score);
            }
            ctx.clearRect(0,0,GAMEBOARD_WIDTH,GAMEBOARD_HEIGHT);
            ctx.font = "30px Arial";
            ctx.fillText("Game Over",200,300);

            return;
        }
    };

    this.moveCar = function (event) {
        let orientation = 0;
        switch (event.keyCode) {
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
                }, 100);
            } else {
                if (interval) {
                    clearInterval(interval);
                }
                interval = setInterval(function () {
                    car.move();
                    car.show();
                    gameBoard.gameOver();
                }, 100);
            }
        }
    };
}
document.getElementById('easy').innerHTML=localStorage.getItem("easy");
document.getElementById('medium').innerHTML=localStorage.getItem("medium");
document.getElementById('hard').innerHTML=localStorage.getItem("hard");
let crash = new Crash();
let diamond = new Diamond();
let car = new Car();
let boom = new Boom();
let gameBoard = new GameBoard(car, boom, diamond, crash);

