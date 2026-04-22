class Postures{
	constructor(name){
		this.name=name;
		this.postures=new Array();
		this.current=0;
		this.currentPhase=0;
	}

	add(imgPath,numberOfPhases){
		let phases=new Array();
		for(let i = 0; i < numberOfPhases; i++){
			phases.push(new Image());
			phases[i].src = imgPath+"/"+ i.toString().padStart(2, '0') +".png";
			//	console.log('Postures.add - i',i, 'src', phases[i].src);
		}
		this.postures.push(phases);
	}

	nextPhase(){
		this.currentPhase++;
		if (this.currentPhase >= this.postures[this.current].length){
			this.currentPhase=0;
		}
	}

	set(newPosture){
		if(0 <= newPosture && newPosture < this.postures.length){
			this.current=newPosture;
			this.currentPhase=0;
		} else {
			console.log('Error:',this.name,' setPosture to', newPosture,' must be between 0 and ',this.postures.length);
		}
	}

	getImg(){
		return(this.postures[this.current][this.currentPhase]);
	}

	reset(){
		this.currentPhase=0;
	}
}