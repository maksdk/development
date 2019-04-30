function Particle(x, y, r, fixed) {
	var options = {
		friction: 1,
		restitution: 1,
		isStatic: fixed
	};
	this.r = r;

	this.body = Bodies.circle(x, y, r, options);

	World.add(world, this.body);

	this.isOnScreen = function(height) {
		var pos = this.body.position;
		return pos.y > height;
	}

	this.removeFromWorld = function() {
		World.remove(world, this.body);
	}

	this.show = function(context) {
		var pos = this.body.position;
		var angle = this.body.angle;
		
		context.save();

		context.beginPath();
		//context.translate(pos.x /*- this.w /2*/ , pos.y /*- this.h / 2*/ );
		//context.rotate(angle);
		context.arc( pos.x/*-this.r*/, pos.y/*-this.r*/, this.r, 0, Math.PI * 2);

		context.fillStyle = "#222222";
		context.fill();

		context.restore();
		
	}
}