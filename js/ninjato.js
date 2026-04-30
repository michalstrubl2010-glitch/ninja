class Ninjato extends Element{
    constructor(cnvs, x, y, w, h) {
        super(cnvs, x, y, w, h);
        this.w = 150;
        this.h = 5;
        this.v = 0;
        this.angle = 0;
        this.handleLength = this.w / 3;
        this.ctx = cnvs.getContext("2d");
        this.angleStep=10;
        this.angleInc=this.angleStep * -1;
        this.xHandle=this.handleLength;
        this.yHandle=this.y;
        this.xEnd=this.x+this.w;
        this.yEnd=this.y;
    }

    animate() {
    }

    draw() {
        const myCos = Math.cos(this.angle * Math.PI / 180); 
        const mySin = Math.sin(this.angle * Math.PI / 180); 

        this.xHandle=this.x + this.handleLength * myCos;
        this.yHandle=this.y + this.handleLength * mySin;

        this.xEnd=this.x + this.w * myCos;
        this.yEnd=this.y + this.w * mySin;
        this.angle=this.angle + this.angleInc;

        if(this.angle < 300 && this.angle > 280){
            this.angleInc=this.angleStep;
        }       
        if (this.angle > 360 ){
            this.angle=0;
        }   
        if (this.angle < 0){
            this.angle=360;
        }
        if (this.angle > 45 && this.angle < 65){
            this.angleInc=this.angleStep * -1;
        }

        const x1 = this.x;
        const y1 = this.y;
        const x2 = this.xHandle;
        const y2 = this.yHandle;
        const x3 = this.xHandle + this.handleLength * 0.15 * myCos;
        const y3 = this.yHandle + this.handleLength * 0.15 * mySin;
        const x4 = this.xEnd;
        const y4 = this.yEnd;

        this.ctx.beginPath();
        this.ctx.lineWidth = this.h;
        this.ctx.strokeStyle = "brown";
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.lineWidth = this.h * 5;
        this.ctx.strokeStyle = "black";
        this.ctx.moveTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.lineWidth = this.h;
        this.ctx.strokeStyle = "silver";
        this.ctx.moveTo(x3, y3);
        this.ctx.lineTo(x4, y4);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}