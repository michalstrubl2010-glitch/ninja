class Background extends Element{
	constructor(cnvs){
		super(cnvs, 0, 0,cnvs.width, cnvs.height)

		this.levelImg = new Image();
		this.levelImg.src = "imgs/background/level-01.png";
		this.sy = 0;
		this.sx = 0; //6400- 2*cnvs.width; // 4000;		
		this.gridSize=0;

	}

	animate() {
		if (this.levelImg.complete) {
			if (this.levelImg.height < this.cnvs.height) {
				this.cnvs.height = this.levelImg.height;
				this.w = this.levelImg.width;
				console.log('Background.w=', this.w);
			}
		}
	}

	draw(){
		if(this.levelImg.complete){
			this.ctx.drawImage(this.levelImg, this.sx, this.sy, this.cnvs.width, this.cnvs.height, 0, 0, this.cnvs.width, this.cnvs.height)
			this.showElement()
		}
	}

	scroll(x){
		console.log('Background.scroll:', x);
		let nsx=this.sx + x;
		if(nsx >= 0 && nsx < this.levelImg.width - this.cnvs.width ){
			this.sx = nsx
		}
	}
}