function Box(x, y, w, h, world) {
	var options = {
		friction: 1,
		restitution: 1
	};
	this.w = w;
	this.h = h;

	this.body = Bodies.rectangle(x, y, w, h, options);

	World.add(world, this.body);

	this.show = function(context) {
		var pos = this.body.position;
		var angle = this.body.angle;
		
		context.save();

		context.beginPath();
		context.translate(pos.x /*- this.w /2*/ , pos.y /*- this.h / 2*/ );
		context.rotate(angle);
		context.rect( -this.w/2, -this.h/2, this.w, this.h);

		context.fillStyle = "#222222";
		context.fill();

		context.restore();
		
	}
}