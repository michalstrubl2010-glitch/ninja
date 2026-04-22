class Element{
    constructor(cnvs, x, y, w, h){
        this.cnvs=cnvs;
        this.ctx=cnvs.getContext("2d");
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
		this.gridSize=0;
    }

    showElement() {
		if (this.gridSize >0 ){
			this.ctx.beginPath();
        	this.ctx.rect(this.x, this.y, this.w, this.h);
        	this.ctx.stroke();
		
			for (let y = 0; y < this.h; y += this.gridSize) {
				this.ctx.beginPath();
				this.ctx.moveTo(this.x, this.y + y);
				this.ctx.lineTo(this.x + this.w, this.y + y);
				this.ctx.stroke();
			}
			
			for (let x = 0; x < this.w; x += this.gridSize) {
				this.ctx.beginPath();
				this.ctx.moveTo(this.x+x,this.y);
				this.ctx.lineTo(this.x + x, this.y + this.h);
				this.ctx.stroke();
			}
		}
    }

}

/*class Shurican{
	constructor(cnvs, x, y, w, h, obstacleType, postures){
        this.cnvs=cnvs;
        this.ctx=cnvs.getContext("2d");
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
		this.obstacleType=obstacleType;
		this.postures = postures;
	}
		
	animate(){
	}
		
	draw(){
	}
}*/

/*
class Enemy(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}

class Points & Bonuses(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Time constraints(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Weapons(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Basic movements(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Obstacles(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Camouflage(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Katanas(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Stamina(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Endurance(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Kunai(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}

class Elevators(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
		
class Lives(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}

class Map(){
	constructor(cnvs, x, y, w, h)
		
		animate(){
		}
		
		draw(){
		}
}
*/