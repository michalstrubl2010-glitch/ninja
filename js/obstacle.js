const obstacleSolidBlock=1;
const obstacleInertBlock=2;	
const obstacleShuriken=100;
const obstacleDeadlyMoving = 3;
const obstacleDeadlyStatic = 4;
const obstacleKey = 5;
const obstacleTree = 6;
class Obstacle extends Element{
	constructor(cnvs, x,y, w, h, obstacleType, postures=null){
		super(cnvs,x,y,w,h);
		this.obstacleType=obstacleType;
		this.color="red"
		this.gridSize= 50;
		this.absX=x;
		this.absY=y;
		this.postures = postures;
	}

	animate(subX){
		this.x= this.absX - subX;
		this.y= this.absY;
		//console.log('Obstacle.animate this.x=',this.x);
	}

	draw(subX,subW){
		let xw = this.absX + this.w;
		if(
			(this.absX>subX && this.absX<subX+subW) || (xw>subX && xw<subX+subW)
		){
			this.showElement();
			if (this.postures != null){
				let img = this.postures.getImg();
				if (img.complete==true){
					this.ctx.drawImage(img, this.x, this.y);
				}           
			} 
		}
	}
}

const ObstacleMovingGoRight = 0;
const ObstacleMovingGoLeft = 1;
class ObstacleMoving extends Obstacle{
	constructor(cnvs, x, y, w, h, obstacleType, moveRangeX, moveRangeY, incX = 5, incY = 0, postures = null){
		super(cnvs, x,y, w, h, obstacleType);
		this.origX=this.absX;
		this.origY=this.absY;
		this.moveRangeX=moveRangeX;
		this.moveRangeY=moveRangeY;
		this.incX=incX;
		this.incY=incY;
		this.postures=postures;
		this.currentPhase = 0;
		this.numberOfPhase = 1;
		this.phasesImgs = [] ;
		console.log('ObstacleMoving.constructor', this.moveRangeY,' ', this.incY)
	}

	animate(subX){
		if(this.absX>=this.origX+this.moveRangeX || this.absX<=this.origX-this.moveRangeX){
			this.incX=this.incX*-1;
			if(this.incX > 0){
				this.postures.set(ObstacleMovingGoRight);
			}else{
					console.log(this.postures.name, this.incX, "ObstacleMovingGoRight");
				this.postures.set(ObstacleMovingGoLeft);
			}
		} else {
			this.postures.nextPhase();
		}
		this.absX = this.absX + this.incX;

		//console.log('OM.animate ',this.postures.name,' absX=',this.absX );
	
		if(this.absY>this.origY+this.moveRangeY || this.absY<this.origY-this.moveRangeY){
			this.incY=this.incY*-1;
		}
		
		this.absY = this.absY + this.incY;
		super.animate(subX);
		
	}
/*	
	draw() {
		this.showElement()
		let img = this.postures.getImg();
		if (img.complete===true){
			this.ctx.drawImage(img, this.x, this.y);
		}
	}*/
}

class ObstacleStatic extends Obstacle{
	constructor(cnvs, x, y, w, h, obstacleType, postures){
		super(cnvs, x, y, w, h, obstacleType, postures);

	}
	animate(){
		if(this.postures){
			this.postures.nextPhase();
		}
	}

	draw() {
		this.showElement()
		let img = this.postures.getImg();
		if (img.complete===true){
			this.ctx.drawImage(img, this.x, this.y, this.w, this.h);
		}
	}
}

const obstacleGate = 7;
class ObstacleGate extends Obstacle {
    constructor(cnvs, x, y, w, h, obstacleType, postures) {
        super(cnvs, x, y, w, h, obstacleType, postures);
        this.gridSize = 100;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
    }

    animate(subX) {
        if (this.postures) {
            this.postures.nextPhase();
        }
        super.animate(subX);
    }

    draw(subX, subW) {
        let xw = this.absX + this.w;
        if ((this.absX > subX && this.absX < subX + subW) || (xw > subX && xw < subX + subW)) {
            this.showElement();
            if (this.postures != null) {
                let img = this.postures.getImg();
                if (img.complete == true) {
                    this.ctx.drawImage(img, this.x, this.y, this.w, this.h);
                }
            }
        }
    }
}