//
//
function GameBoard(car, boom, diamond, crash) {
    this.hightScore = null;
    this.gameplayer = null;
    let ctx = document.getElementById('gameCanvas').getContext('2d');
    this.gameLevel = function (level) {
        if (car.speed == 0) {
            if (level.value == 1) {
                car.speed = 10;
                autorun = 7000;
                level.style.backgroundColor = "#03a9f4";
                this.hightScore = "easy";
                this.gameplayer = "easy1";

            }
            if (level.value == 2) {
                car.speed = 20;
                autorun = 6000;
                level.style.backgroundColor = "#03a9f4";
                this.hightScore = "medium";
                this.gameplayer = "medium1";
            }
            if (level.value == 3) {
                car.speed = 30;
                autorun = 4500;
                level.style.backgroundColor = "#03a9f4";
                this.hightScore = "hard";
                this.gameplayer = "hard1";
            }
        }
    };

    this.start = function () {
        if (car.speed == 0) {
            confirm("Please! Choose level");
        } else {
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
        }

        this.newGame = function () {
            location.reload();
        };
        this.gameOver = function () {
            document.getElementById('score').innerHTML = score;
            document.getElementById('boom').innerHTML = X_RANDOM_BOOM.length;
            document.getElementById('speed').innerHTML = car.speed + 80 + " km/h";
            console.log(car.speed);
            if (car.speed <= 20 && score == 2000) {
                car.speed = 20;
            } else if (car.speed < 30 && score == 4000) {
                car.speed = 30;
            }
            if (crash.crash()) {
                if (score > localStorage.getItem(this.hightScore)) {
                    localStorage.setItem(this.gameplayer, prompt("Hight score!! Enter your name"));
                    localStorage.setItem(this.hightScore, score);

                }
                ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
                ctx.font = "40px Arial";
                ctx.fillStyle = "red";
                ctx.fillText("Game Over ^.^ Your Score: " + score, 150, 300);

                return;
            }
            if (X_RANDOM_BOOM.length == 5) {
                if (score > localStorage.getItem(this.hightScore)) {
                    localStorage.setItem(this.gameplayer, prompt("Hight score!! Enter your name"));
                    localStorage.setItem(this.hightScore, score);

                }
                ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
                ctx.font = "30px Arial";
                ctx.fillText("Game Over", 200, 300);

                return;
            }
        }
    };
    this.showHightScore=function () {
        document.getElementById('easy').innerHTML = localStorage.getItem("easy");
        document.getElementById('medium').innerHTML = localStorage.getItem("medium");
        document.getElementById('hard').innerHTML = localStorage.getItem("hard");
        document.getElementById('easy1').innerHTML = localStorage.getItem("easy1");
        document.getElementById('medium1').innerHTML = localStorage.getItem("medium1");
        document.getElementById('hard1').innerHTML = localStorage.getItem("hard1");
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
