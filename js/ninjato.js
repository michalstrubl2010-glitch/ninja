class Ninjato extends Obstacle{
    constructor(cnvs, x, y, w, h) {
        super(cnvs, x,y, w, h);
        this.w = 150;
        this.h = 5;
        this.v = 0;
        this.angle = 0;
        this.handleLength = this.w / 3;
        this.ctx = cnvs.getContext("2d");
    }

    animate() {
    }

    draw() {
        const cos = Math.cos(this.angle);
        const sin = Math.sin(this.angle);

        const x1 = this.x;
        const y1 = this.y;

        const x2 = x1 + this.handleLength * cos;
        const y2 = y1 + this.handleLength * sin;

        const x3 = x2 + 10 * cos;
        const y3 = y2 + 10 * sin;

        const x4 = x3 + (this.w - this.handleLength - 10) * cos;
        const y4 = y3 + (this.w - this.handleLength - 10) * sin;

        this.ctx.beginPath();
        this.ctx.lineWidth = this.h;
        this.ctx.strokeStyle = "brown";
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.lineWidth = this.h;
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