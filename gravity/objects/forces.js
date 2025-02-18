﻿function Forces(){
}

// STATIC METHODS
Forces.zeroForce = function() {
	return (new Vector2D(0,0));
}
Forces.constantGravity = function(m,g){
	return new Vector2D(0,m*g);
}
Forces.gravity = function(G,m1,m2,r){
	return r.multiply(-G*m1*m2/(r.lengthSquared()*r.length()));
}
Forces.gravityModified = function(G,m1,m2,r,eps){
	return r.multiply(-G*m1*m2/((r.lengthSquared()+eps*eps)*r.length()));
}
Forces.electric = function(k,q1,q2,r){
	return r.multiply(k*q1*q2/(r.lengthSquared()*r.length()));
}
Forces.forceField = function(q,E) {
	return E.multiply(q);
}
Forces.lorentz = function(q,E,B,vel) {
	return E.multiply(q).add(vel.perp(q*B*vel.length()));
}		
Forces.central = function(k,n,r) {
	return r.multiply(k*Math.pow(r.length(),n-1));
}
Forces.linearDrag = function(k,vel){
	var force;
	var velMag = vel.length();
	if (velMag > 0) {
		force = vel.multiply(-k);
	}else {
		force = new Vector2D(0,0);
	}
	return force;
}
Forces.drag = function(k,vel) {
	var force;
	var velMag = vel.length();
	if (velMag > 0) {
		force = vel.multiply(-k*velMag);
	}
	else {
		force = new Vector2D(0,0);
	}
	return force;			
}
Forces.lift = function(k,vel) {
	var force;
	var velMag = vel.length();
	if (velMag > 0) {
		force = vel.perp(k*velMag);
	}
	else {
		force = new Vector2D(0,0);
	}
	return force;			
}			
Forces.upthrust = function(rho,V,g) {
	return new Vector2D(0,-rho*V*g);
}	
Forces.vortex = function(k,r0,r){
	var force;
	var rMag = r.length();
	if (rMag > 0){
		if (rMag > r0) {
			force = r.multiply(-k*Math.pow(r0/rMag,4));
		}else{
			force = r.multiply(k);
		}
	}else{
		force = new Vector2D(0,0);
	}
	return force;
}	
Forces.spring = function(k,r){
	return r.multiply(-k);
}		
Forces.damping = function(c,vel){
	var force;
	var velMag = vel.length();
	if (velMag>0) {
		force = vel.multiply(-c);
	}
	else {
		force = new Vector2D(0,0);
	}
	return force;
}		
Forces.add = function(arr){
		var forceSum = new Vector2D(0,0);
		for (var i=0; i<arr.length; i++){
		var force = arr[i];
		forceSum.incrementBy(force);
	}
	return forceSum;
}

