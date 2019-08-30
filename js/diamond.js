//
//
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
        image.src = 'img/diamond.png';

    };
    this.removeDiamond = function () {
        let ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.clearRect(xDiamond, yDiamond, 50, 28);
        xDiamond = null;
        yDiamond = null;
    }

}
