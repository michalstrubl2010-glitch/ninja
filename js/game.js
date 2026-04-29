class Game {
    constructor(cnvsName) {
        this.cnvs = document.getElementById(cnvsName);
        this.background = new Background(this.cnvs);
        this.ninja = new Ninja(this.cnvs);
        this.obstacles = new Array();
        this.inventory = new Array();
        this.gameOver = false;
        this.shurikenCount = 3;
        this.ninjato = new Ninjato(this.cnvs, 300, 200);
        this.obstacles.push(new Obstacle(this.cnvs, 0, 685, 550, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 550, 655, 50, 40, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 600, 620, 40, 70, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 640, 580, 42, 70, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 682, 550, 373, 60, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1055, 571, 63, 60, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1118, 610, 57, 60, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1156, 650, 50, 90, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1205, 698, 750, 51, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1955, 700, 70, 49, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1990, 700, 40, 190, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 2025, 840, 1145, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 2025, 800, 25, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 2025, 750, 50, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 3170, 790, 25, 25, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 3195, 790, 30, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 3220, 750, 3250, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 5900, 500, 100, 40, obstacleSolidBlock));
        this.obstacles.push(new Obstacle(this.cnvs, 6100, 350, 100, 40, obstacleSolidBlock));
        this.obstacles.push(new Obstacle(this.cnvs, 6290, 200, 100, 40, obstacleSolidBlock));

        let postures = new Postures("Kopi");
        postures.add("imgs/tools/spear/", 1);
        this.obstacles.push(new Obstacle(this.cnvs, 6025, 550, 25, 200, obstacleDeadlyStatic, postures));
        this.obstacles.push(new Obstacle(this.cnvs, 6050, 550, 25, 200, obstacleDeadlyStatic, postures));  
        this.obstacles.push(new Obstacle(this.cnvs, 6250, 550, 25, 200, obstacleDeadlyStatic, postures));
        this.obstacles.push(new Obstacle(this.cnvs, 6275, 550, 25, 200, obstacleDeadlyStatic, postures));

        postures = new Postures("Gate")
        postures.add("imgs/background/castle/gate-close", 1);
        postures.add("imgs/background/castle/gate-open", 1);
        this.gate = new Obstacle(this.cnvs, 790, 381, 148, 170, obstacleGate, postures);
        this.obstacles.push(this.gate);

        postures = new Postures("Cylinder");
        postures.add("imgs/obstacles/obstacleMoving", 1);
        this.obstacles.push(new ObstacleMoving(this.cnvs, 1400, 698 - 400, 200, 400, obstacleDeadlyMoving, 100, 0, 5, 0, postures));

        postures = new Postures("Sun");
        postures.add("imgs/background/sun", 4);
        this.obstacles.push(new ObstacleStatic(this.cnvs, 200, 22, 70, 70, obstacleInertBlock, postures));

        postures = new Postures("Bird");
        postures.add("imgs/obstacles/bird/go-right", 2);
        postures.add("imgs/obstacles/bird/go-left", 2);
        this.obstacles.push(new ObstacleMoving(this.cnvs, 300, 100, 100, 100, obstacleDeadlyMoving, 400, 5, 5, 5, postures));
        
        postures = new Postures("HealthBar");
        postures. add("imgs/tools/healthbar", 1);
        this.healthBar = new HealthBar(this.cnvs, 800, 25, 300, 49, obstacleInertBlock, postures);
        if (this.healthBar) {
            this.obstacles.push(this.healthBar);
        }  

        postures = new Postures("Samurai");
        postures.add("imgs/samurai/go-right", 3);
        postures.add("imgs/samurai/go-left", 3);
        this.obstacles.push(new ObstacleMoving(this.cnvs, 4200, 550, 100, 200, obstacleDeadlyMoving, 600, 0, 5, 0, postures));  

        postures = new Postures("Tree")
        postures.add("imgs/background/tree", 1);
        this.obstacles.push(new Obstacle(this.cnvs, 3680, 330, 250, 450, obstacleTree, postures));
        this.obstacles.push(new Obstacle(this.cnvs, 4000, 330, 250, 450, obstacleTree, postures));
        this.obstacles.push(new Obstacle(this.cnvs, 4450, 330, 250, 450, obstacleTree, postures));

        postures = new Postures("KeyInInve");
        postures.add("imgs/tools/key/nokey", 1);
        postures.add("imgs/tools/key/key", 1);
        let key = new ObstacleStatic(this.cnvs, 1540, 50, 50, 50, obstacleInertBlock, postures);
        key.gridSize = 0;
        this.obstacles.push(key); 
        this.inventory.push(key);
        this.keyInv = key;

        postures = new Postures("Key");
        postures.add("imgs/tools/key/key/", 1);
        this.Key = new Obstacle(this.cnvs, 6340, 150, 50, 50, obstacleKey, postures);
        this.Key.gridSize = 100;
        this.obstacles.push(this.Key);
        this.inventory.push(this.Key);

        postures = new Postures("Shuriken1");
        postures.add("imgs/tools/shuriken/ready", 1);
        postures.add("imgs/tools/shuriken/empty", 1);
        let sh1 = new ObstacleStatic(this.cnvs, 1600, 50, 50, 50, obstacleInertBlock, postures);
        sh1.gridSize = 0;
        this.obstacles.push(sh1);
        this.inventory.push(sh1);

        postures = new Postures("Shuriken2");
        postures.add("imgs/tools/shuriken/ready", 1);
        postures.add("imgs/tools/shuriken/empty", 1);
        let sh2 = new ObstacleStatic(this.cnvs, 1650, 50, 50, 50, obstacleInertBlock, postures);
        sh2.gridSize = 0;
        this.obstacles.push(sh2);
        this.inventory.push(sh2);

        postures = new Postures("Shuriken3");
        postures.add("imgs/tools/shuriken/ready", 1);
        postures.add("imgs/tools/shuriken/empty", 1);
        let sh3 = new ObstacleStatic(this.cnvs, 1700, 50, 50, 50, obstacleInertBlock, postures);
        sh3.gridSize = 0;
        this.obstacles.push(sh3);
        this.inventory.push(sh3);
    }

    setlevel(){
        this.background.levelImg.src = "imgs/background/level-02.png";
        this.ninja = new Ninja(this.cnvs);
        this.obstacles = new Array();
        this.inventory = new Array();
        this.gameOver = false;
        this.shurikenCount = 3;
        this.ninja = new Ninja(this.cnvs, 100, 200);
        this.ninjato = new Ninjato(this.cnvs, 300, 200);
        this.obstacles.push(new Obstacle(this.cnvs, 0, 708, 550, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 550, 685, 50, 40, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 600, 658, 43, 60, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 643, 625, 45, 80, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 690, 560, 450, 100, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1140, 580, 60, 70, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1200, 620, 50, 60, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1250, 660, 40, 90, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1290, 698, 690, 51, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1955, 700, 70, 49, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 1990, 700, 40, 190, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 2025, 840, 1145, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 2025, 800, 25, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 2025, 750, 50, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 3170, 790, 25, 25, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 3195, 790, 30, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 3220, 750, 3250, 50, 1));
        this.obstacles.push(new Obstacle(this.cnvs, 5900, 500, 100, 40, obstacleSolidBlock));
        this.obstacles.push(new Obstacle(this.cnvs, 6100, 350, 100, 40, obstacleSolidBlock));
        this.obstacles.push(new Obstacle(this.cnvs, 6290, 200, 100, 40, obstacleSolidBlock));
        
        let postures = new Postures("HealthBar");
        postures. add("imgs/tools/healthbar", 1);
        this.healthBar = new HealthBar(this.cnvs, 800, 25, 300, 49, obstacleInertBlock, postures);
        if (this.healthBar) {
            this.obstacles.push(this.healthBar);
        } 

        postures = new Postures("KeyInInve");
        postures.add("imgs/tools/key/nokey", 1);
        postures.add("imgs/tools/key/key", 1);
        let key = new ObstacleStatic(this.cnvs, 1540, 50, 50, 50, obstacleInertBlock, postures);
        key.gridSize = 0;
        this.obstacles.push(key); 
        this.inventory.push(key);

        postures = new Postures("Key");
        postures.add("imgs/tools/key/key/", 1);
        this.Key = new Obstacle(this.cnvs, 6340, 150, 50, 50, obstacleKey, postures);
        this.Key.gridSize = 100;
        this.obstacles.push(this.Key);
        this.inventory.push(this.Key);

        postures = new Postures("Shuriken1");
        postures.add("imgs/tools/shuriken/ready", 1);
        postures.add("imgs/tools/shuriken/empty", 1);
        let sh1 = new ObstacleStatic(this.cnvs, 1600, 50, 50, 50, obstacleInertBlock, postures);
        sh1.gridSize = 0;
        this.obstacles.push(sh1);
        this.inventory.push(sh1);

        postures = new Postures("Shuriken2");
        postures.add("imgs/tools/shuriken/ready", 1);
        postures.add("imgs/tools/shuriken/empty", 1);
        let sh2 = new ObstacleStatic(this.cnvs, 1650, 50, 50, 50, obstacleInertBlock, postures);
        sh2.gridSize = 0;
        this.obstacles.push(sh2);
        this.inventory.push(sh2);

        postures = new Postures("Shuriken3");
        postures.add("imgs/tools/shuriken/ready", 1);
        postures.add("imgs/tools/shuriken/empty", 1);
        let sh3 = new ObstacleStatic(this.cnvs, 1700, 50, 50, 50, obstacleInertBlock, postures);
        sh3.gridSize = 0;
        this.obstacles.push(sh3);
        this.inventory.push(sh3);
    }

    resize() {
        if (this.background.levelImgs[0].width < document.body.clientWidth)
            this.cnvs.width = this.background.levelImgs[0].width;
        else
            this.cnvs.width = document.body.clientWidth;

        if (this.background.levelImgs[0].height < document.body.clientHeight)
            this.cnvs.height = this.background.levelImgs[0].height;
        else
            this.cnvs.height = document.body.clientHeight;
    }

    animate() {
         if (this.ninja.healthStatus <= 0) {
            this.gameOver = true;
            return; 
        }
        if (keyState[17] && this.ninja.shurikenCount > 0 && this.ninja.shurikenReady) {
            this.ninja.shurikenCount--;
            this.ninja.shurikenReady = false; 
            let postures = new Postures("HázecíShuriken4");
            postures.add("imgs/tools/shuriken/ready", 3);
			let x = this.ninja.x + Math.round(this.ninja.w/3) + this.background.sx;
			let y = this.ninja.y + Math.round(this.ninja.h / 3);
            let incX;
            if (this.ninja.direction === ninjaGoRight) {
                incX = 20;
            } else {
                incX = -20;
            }
			let fallDistance=this.ninja.y + this.ninja.h - y - 50;
            this.obstacles.push(new Shuriken(this.cnvs,x, y, 50, 50, obstacleShuriken, postures, 300,fallDistance, incX, gravity));
        }

        if (keyState[17] == false ){
            this.ninja.shurikenReady=true;
        }

		if (keyState[37] || keyState[65]){
            if(!(this.ninja.inAir && this.ninja.direction == ninjaGoRight)){
                if(!this.ninja.goLeft(this.background.sx)){
                    this.background.scroll(-10);
                }
            }
        }
        if (keyState[39] || keyState[68]){
            if(!(this.ninja.inAir && this.ninja.direction == ninjaGoLeft)){
                console.log("Game.animate() this.background.w=",this.background.w)
                if(!this.ninja.goRight(this.background.sx, this.background.w)){
                    this.background.scroll(10);
                }
            }
		}
        if (keyState[38]) {
            if (!this.ninja.inAir) this.ninja.doJump(20);
        }
        if (keyState[32]) this.ninja.debug = true;

        this.background.animate();
        for (let idx = 0; idx < 3; idx++) {
            if (this.ninja.shurikenCount > idx){
                //this.obstacles[this.shurikenInventoryIdx + idx].postures.set(0);
                this.inventory[idx].postures.set(0);
            }else{
                //this.obstacles[this.shurikenInventoryIdx + idx].postures.set(1);
                this.inventory[idx].postures.set(1);
            }
        }

        this.ninja.animate(this.obstacles);
        if(this.ninja.hasKey){
            this.gate.postures.set(1);
            this.keyInv.postures.set(1); //robert
        }
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].animate(this.background.sx);
            if (this.obstacles[i].obstacleType == obstacleShuriken){
                this.obstacles[i].checkColission(this.obstacles);
            }
	    }

        if (this.ninja.inGate === true) {
            console.log("Další úroveň");
            if (this.ninja.hasKey === true){
                this.setlevel()
            };
        }
    }

    draw() {
        this.healthBar.healthStatus = this.ninja.healthStatus;
        this.background.draw();
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].draw(this.background.sx, this.background.w);
        }
        this.ninja.draw();
        this.ninjato.draw();
    }

    writeGameOver(){
        let ctx = this.cnvs.getContext("2d");
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, this.cnvs.width, this.cnvs.height);
        ctx.fillStyle = "#FF0000";
        ctx.font = "bold 100px Arial";
        ctx.textAlign = "center";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 15;
        ctx.fillText("GAME OVER", this.cnvs.width / 2, this.cnvs.height / 2);
        ctx.shadowBlur = 0;
        let imgW = 300;
        let imgH = 150;
        ctx.drawImage(
            this.gameOverImg,
            this.cnvs.width / 2 - imgW / 2,
            this.cnvs.height / 2 + 40,
            imgW,
            imgH
        );
    }
}