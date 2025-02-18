// dependencies: Vector2D
function Particle(radius,color,mass,charge,gradient,line){
	if(typeof(radius)==='undefined') radius = 20;
	if(typeof(color)==='undefined') color = '#0000ff';
	if(typeof(mass)==='undefined') mass = 1;
	if(typeof(charge)==='undefined') charge = 0;
	if(typeof(gradient)==='undefined') gradient = false;	
	if(typeof(line)==='undefined') line = false;	
	this.radius = radius;
	this.color = color;
	this.mass = mass;
	this.charge = charge;
	this.gradient = gradient;
	this.line = line;
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;	
	this.angVelo = 0;	
	this.vertices = new Array(new Vector2D(-radius,0),new Vector2D(radius,0),new Vector2D(0,-radius),new Vector2D(0,radius));
}		

Particle.prototype = {
	get pos2D (){
		return new Vector2D(this.x,this.y);			
	},
	set pos2D (pos){
		this.x = pos.x;
		this.y = pos.y;
	},
	get velo2D (){
		return new Vector2D(this.vx,this.vy);			
	},
	set velo2D (velo){
		this.vx = velo.x;
		this.vy = velo.y;
	},
	set rotation (angle){ // value of angle is not itself of interest; use it to rotate vertices
		for (var i=0; i<this.vertices.length; i++){
			this.vertices[i] = this.vertices[i].rotate(angle);
		}
	},	
	draw: function (context) {  
		if (this.gradient){
			grad = context.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);
			grad.addColorStop(0,'#ffffff');
			grad.addColorStop(1,this.color);
			context.fillStyle = grad;
		}else{
			context.fillStyle = this.color;
		}	
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
		context.closePath();
		context.fill();		
		if (this.line){
			var v = new Array();
			for (var i=0; i<this.vertices.length; i++){
				v[i] = this.vertices[i].add(this.pos2D);
			}		
			context.strokeStyle = this.color;
			context.lineWidth = 2;
			context.beginPath();
			context.moveTo(v[0].x,v[0].y);
			context.lineTo(v[1].x,v[1].y);
			context.moveTo(v[2].x,v[2].y);			
			context.lineTo(v[3].x,v[3].y);
			context.closePath();
			context.stroke();
		}
	}
};


