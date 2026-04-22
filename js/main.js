function animation(currentTime) {
        //console.log('animation(',currentTime,')');
        if (currentTime - lastAnimationTime > 50){
            //game.timer(currentTime);
            game.animate();
            game.draw();
            lastAnimationTime=currentTime;
        }

        if(game.gameOver==false){
                requestAnimationFrame(animation);
        } else {
               game.writeGameOver();
        }
}
 
const resize = () => {
  cnvs.width = document.body.clientWidth*0.95;
  cnvs.height = document.body.clientHeight*.95;
  console.log("resize cnvs.width=", cnvs.width, "cnvs.height=", cnvs.height);
}
 
 
cnvs=document.getElementById('canvas');
cnvs.width = document.body.clientWidth*0.95;
cnvs.height = document.body.clientHeight*.95;
 
const game=new Game ('canvas');
 
 
window.addEventListener('resize', resize)
const gravity=20;
let lastAnimationTime=0;
requestAnimationFrame(animation);