function Circle(x, y, r, world) {
	var options = {
		friction: 1,
		restitution: 1
	};
	this.r = r;

	this.body = Bodies.circle(x, y, r, options);

	World.add(world, this.body);

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