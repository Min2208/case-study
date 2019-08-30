//
//
function Car() {
    this.xPosition = DEFAULT_CAR_X_POSITION;
    this.yPosition = DEFAULT_CAR_Y_POSITION;
    this.orientation = DEFAULT_CAR_ORIENTATION;
    let xClear = this.xPosition;
    let yClear = this.yPosition;
    this.speed = carSpeed;

    this.buildImage = function () {
        this.image = "img/"+this.orientation + '.png';
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
                if (this.yPosition <= GAMEBOARD_HEIGHT - this.speed - 50) {
                    this.yPosition += this.speed;
                }
                break;
            case ORIENTATION_LEFT:
                if (this.xPosition >= this.speed) {
                    this.xPosition -= this.speed;
                }
                break;
            case ORIENTATION_RIGHT:
                if (this.xPosition <= GAMEBOARD_WIDTH - this.speed - 50) {
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