//
//
function Boom() {
    this.xPosition = 0;
    this.yPosition = 0;
    for (let i = 0; i < 20; i++) {
        X_RANDOM_WALL.push(Math.floor(Math.random() * 9) * 100);
        Y_RANDOM_WALL.push(Math.floor(Math.random() * 6) * 100);
    }
    this.showBoom = function () {
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
            image.src = 'img/boom1.png';
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
            image.src = 'img/wall.png';
        }
    };
}
