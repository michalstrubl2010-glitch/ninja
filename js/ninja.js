const velocityWalk = 20;
const velocityJump = 25;
const ninjaGoRight = 0;
const ninjaGoLeft = 1;

class Ninja extends Element {
    constructor(cnvs) {
        super(cnvs, 350, 400, 100, 200);
        this.gridSize = 0;
        this.jump = 0;
        this.inAir = true;
        this.debug = false;
        this.shurikenCount = 3;
        this.velocity = velocityWalk;
        this.postures = new Postures("ninjaPostures");
        this.postures.add("imgs/ninja/go-right/", 5);
        this.postures.add("imgs/ninja/go-left/", 5);    
        this.postures.set(ninjaGoRight);
        this.shurikenReady = true;
        this.healthStatus = 100;
        this.inGate = false;
        this.hasKey = true;
    }

    animate(obstacles) {
        let ny;
        if (this.jump > 0) {
            ny = this.y - gravity;
            this.jump--;
        } else {
            ny = this.y + gravity;
        }

        this.inAir = true;
        let yh = ny + this.h;
        let xw = this.x + this.w;
        let lastObstacleInX = -1;

        for (let i = 0; i < obstacles.length; i++) {
            if (obstacles[i].obstacleType == obstacleInertBlock || obstacles[i].obstacleType == obstacleTree) 
                continue;
            if (obstacles[i].obstacleType == obstacleShuriken) {
                if ((xw >= obstacles[i].x && xw <= obstacles[i].x + obstacles[i].w) || 
                    (this.x >= obstacles[i].x && this.x <= obstacles[i].x + obstacles[i].w)) {
                    if ((obstacles[i].y > ny && obstacles[i].y < yh) ||
                    (obstacles[i].y + obstacles[i].h > ny && obstacles[i].y + obstacles[i].h < yh)){
                        if(obstacles[i].notCollided == false){
                            this.shurikenCount = this.shurikenCount + 1;
                            obstacles.splice(i, 1);
                            i--;
                        }
                    }
                }
            }else if (obstacles[i].obstacleType == obstacleDeadlyMoving) {
                if (
                    (obstacles[i].y <= ny && ny <= obstacles[i].y + obstacles[i].h) ||
                    (obstacles[i].y <= yh && yh <= obstacles[i].y + obstacles[i].h) ||
                    (ny < obstacles[i].y && obstacles[i].y < yh) ||
                    (ny < obstacles[i].y + obstacles[i].h && obstacles[i].y + obstacles[i].h < yh)
                ) {
                    if (xw >= obstacles[i].x && xw <= (obstacles[i].x + obstacles[i].w)) {
                        this.x = obstacles[i].x - this.w;
                        this.healthStatus -= 3;
                    } else if (this.x >= obstacles[i].x && this.x <= (obstacles[i].x + obstacles[i].w)) {
                        this.x = obstacles[i].x + obstacles[i].w;
                        this.healthStatus -= 3;
                    }
                    if (this.healthStatus < 0) this.healthStatus = 0;
                }
            }else if (obstacles[i].obstacleType == obstacleDeadlyStatic){
                if (
                    (obstacles[i].y <= yh && yh <= obstacles[i].y + obstacles[i].h * 0.3)
                ) {
                    console.log ("AAAAAA")
                    if (
                        (xw >= obstacles[i].x && xw <= (obstacles[i].x + obstacles[i].w)) ||
                        (this.x >= obstacles[i].x && this.x <= (obstacles[i].x + obstacles[i].w)) ||
                        (obstacles[i].x > this.x && obstacles[i].x < xw)
                        ) {
                        console.log("bbb")
                        //this.x = obstacles[i].x + obstacles[i].w;
                        this.healthStatus -= 3;
                    }
                    if (this.healthStatus < 0) this.healthStatus = 0;
                }

            } else if (obstacles[i].obstacleType == obstacleKey) {
                if (
                    (obstacles[i].y < ny && ny < obstacles[i].y + obstacles[i].h) ||
                    (obstacles[i].y < yh && yh < obstacles[i].y + obstacles[i].h) ||
                    (ny < obstacles[i].y && obstacles[i].y < yh) ||
                    (ny < obstacles[i].y + obstacles[i].h && obstacles[i].y + obstacles[i].h < yh)
                ) {
                    if (
                        (xw >= obstacles[i].x && xw <= (obstacles[i].x + obstacles[i].w)) || 
                        (this.x >= obstacles[i].x && this.x <= (obstacles[i].x + obstacles[i].w))
                    ) {
                        this.hasKey = true;
                        obstacles.splice(i, 1);
                        i--;
                        console.log("Ninja získal klíč!");
                    }
                }
            } else if (obstacles[i].obstacleType == obstacleGate) {
                if (
                    (obstacles[i].y < ny && ny < obstacles[i].y + obstacles[i].h) ||
                    (obstacles[i].y < yh && yh < obstacles[i].y + obstacles[i].h) ||
                    (ny < obstacles[i].y && obstacles[i].y < yh) ||
                    (ny < obstacles[i].y + obstacles[i].h && obstacles[i].y + obstacles[i].h < yh)
                ) {
                    if (
                        (xw >= obstacles[i].x && xw <= (obstacles[i].x + obstacles[i].w)) || 
                        (this.x >= obstacles[i].x && this.x <= (obstacles[i].x + obstacles[i].w))
                    ) {
                        this.inGate = true;
                        console.log("Další úroveň");
                    }
                }
            } else {
                if ((xw >= obstacles[i].x && xw <= obstacles[i].x + obstacles[i].w) ||
                    (this.x >= obstacles[i].x && this.x <= obstacles[i].x + obstacles[i].w)) {
                    if (yh >= obstacles[i].y && yh <= obstacles[i].y + obstacles[i].h && obstacles[i].y > ny - this.h) {
                        if (lastObstacleInX < 0 || obstacles[lastObstacleInX].y > obstacles[i].y) {
                            this.inAir = false;
                            ny = obstacles[i].y - this.h;
                            yh = ny + this.h;
                            lastObstacleInX = i;
                        }
                    }
                }
            }
        }

        this.y = ny;
        if (this.inAir) {
            this.velocity -= 1;
            if (this.velocity < 0) this.velocity = 0;
        } else {
            this.velocity = velocityWalk;
        }
    }

    draw() {
        this.showElement();
        let img = this.postures.getImg();
        if (img.complete) {
            this.ctx.drawImage(img, this.x, this.y);
        }
    }

    goRight(backgroundSX, backgroundW) {
        this.direction = ninjaGoRight;
        if (this.velocity > 0) {
            if (this.postures.current !== ninjaGoRight) {
                this.postures.set(ninjaGoRight);
            }
            this.postures.nextPhase();
        }
        if (this.x > (this.cnvs.width - this.cnvs.width / 5 - this.w) ){
            console.log ('this.x < (this.cnvs.width - this.cnvs.width / 5 - this.w) || (backgroundSX >= (backgroundW - this.cnvs.width) && (this.x + this.w+10) < this.cnvs.width )) ');
            console.log("this.x=",this.x, "this.w=",this.w,"backgroundSX=",backgroundSX, "backgroundW=",backgroundW, "this.cnvs.width=",this.cnvs.width,"this.x",this.x," < this.cnvs.width");
        }
         
        if (this.x < (this.cnvs.width - this.cnvs.width / 5 - this.w) || ((10+backgroundSX) >= (backgroundW - this.cnvs.width) && (this.x + this.w+10) < this.cnvs.width )) {
            this.x += 50;
            return true;
        } else {
            console.log("backgroundSX=",backgroundSX, "backgroundW=",backgroundW, "this.cnvs.width=",this.cnvs.width,"this.x",this.x," < this.cnvs.width");
            return false;
        }
    }

    goLeft(backgroundSX) {
        this.direction = ninjaGoLeft;
        if (this.velocity > 0) {
            if (this.postures.current !== ninjaGoLeft) {
                this.postures.set(ninjaGoLeft);
            }
            this.postures.nextPhase();
        }
        if (this.x > this.cnvs.width / 5 || backgroundSX == 0 && this.x > 50) {
            this.x -= 50;
            return true;
        } else {
            console.log('ninja.goLeft return false');
            return false;
        }
    }

    doJump() {
        if (!this.inAir) {
            this.jump = velocityJump;
        }
    }
}