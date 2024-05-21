const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth-10;
ctx.canvas.height = window.innerHeight-25;
ctx.shadowBlur = 50;

var count = 0;
var balls = [];
var blurColors = ["blue","red","green","yellow","orange","cyan","white"]

class Circle {

  constructor(x, y, r, col, vel_y, vel_x, grav) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel_y = 1;
    this.vel_x = Math.floor(Math.random() * 15);
    this.grav = Math.max(Math.random(), .5);
    this.rand = Math.floor(Math.random() * blurColors.length);
    this.rand2 = Math.floor(Math.random() * blurColors.length);
    this.col = col;
    if (count %2 == 0) {
    	this.vel_x = this.vel_x;
    } else {
    	this.vel_x = -this.vel_x;
    }
  }

  draw(){
  	ctx.beginPath();
  	ctx.shadowColor = blurColors[this.rand2];
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.fillStyle = blurColors[this.rand];
		ctx.fill();	
  }

  update(){  	
  	if (this.y + this.r >= canvas.height) {
  		if (this.vel_y > 0) {
  			this.vel_y = -(this.vel_y-1);
  		}
   		this.vel_x*=this.grav;
  	}

  	this.y += this.vel_y;
  	if (this.y + this.r <= canvas.height-5) {
	    	this.vel_y += 1;
	  }

	  if (this.x + this.r >= canvas.width || this.x - this.r <= 15) {
	  		this.vel_x = -this.vel_x;
	  }
	  this.x += this.vel_x;
  }

}

canvas.addEventListener('mousedown', handleMouseDown);
function handleMouseDown(e) {
	count++;
	balls.push(new Circle(e.pageX,e.pageY,20,"white",0,0));
	if (balls.length==15) {
    balls.splice(0, 1);
  }
}

function fpsGame(timestamp){
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	for (let i = 0; i < balls.length; i++) {
		balls[i].draw();
    balls[i].update();
  }
  requestAnimationFrame(fpsGame);
}

requestAnimationFrame(fpsGame);