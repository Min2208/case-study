//
//
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

        }
    }
}
