class HealthBar extends ObstacleStatic {
    constructor(cnvs, x, y, w, h, obstacleInertBlock, postures) {
        console.log (postures)
        super(cnvs, x, y, w, h, obstacleInertBlock, postures);

        this.healthStatus = 100;
        this.gridSize = 0;
    }

    draw() {
        super.draw();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 4;

        let startX = this.x + 45;
        let startY = this.y + 40;
        let barLength = 220/100 * this.healthStatus;

        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(startX + barLength, startY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}