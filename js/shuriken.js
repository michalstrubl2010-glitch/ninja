class Shuriken extends ObstacleMoving {
    constructor(cnvs, x, y, w, h, obstacleType, postures, moveRangeX, moveRangeY, incX = 5, incY = 0) {
        super(cnvs, x, y, w, h, obstacleType, moveRangeX, moveRangeY, incX, incY, postures);
        this.throwDistance = moveRangeX;
        this.fallDistance = moveRangeY;
        this.notCollided = true;
    }

    animate(subX) {
        if (this.notCollided == true) {
            if (this.throwDistance > 0) {
                if (this.throwDistance < this.fallDistance) {
                    if (this.incX > 0) this.incX--;
                    if (this.incX < 0) this.incX++;
                }
                this.absX = this.absX + this.incX;
                this.throwDistance = this.throwDistance - Math.abs(this.incX);
            }
            if (this.throwDistance < this.fallDistance) {
                this.absY = this.absY + this.incY;
            }
            this.postures.nextPhase();
        }
        this.x = this.absX - subX;
        this.y = this.absY;
    }

    checkColission(obstacles) {
        let xw = this.x + this.w;
        let yh = this.y + this.h;
        for (let i = 0; i < obstacles.length; i++) {
            let obs = obstacles[i];
            if (obs.obstacleType != obstacleInertBlock && obs.obstacleType != ObstacleMoving) {
                if (((xw > obs.x && xw < obs.x + obs.w) || (this.x > obs.x && this.x < obs.x + obs.w)) &&
                    ((yh > obs.y && yh < obs.y + obs.h) || (this.y > obs.y && this.y < obs.y + obs.h))) {
                    this.notCollided = false;
                    if (obs.obstacleType === obstacleDeadlyMoving) {
                        obstacles.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    }
}