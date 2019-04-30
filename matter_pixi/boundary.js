function Boundary(x, y, w, h, angle, world) {

	var options = {
		friction: 1,
		restitution: 1,
		angle: angle || 0,
		isStatic: true
	};
	this.w = w;
	this.h = h;

	this.body = Bodies.rectangle(x, y, w, h, options);
	console.log(this.body.type)
	World.add(world, this.body);

	this.show = function(context) {
		var pos = this.body.position;
		var angle = this.body.angle;
		
		context.save();

		context.beginPath();
		context.translate( pos.x, pos.y );
		context.rotate(angle);
		context.rect( -this.w/2, -this.h/2, this.w, this.h);
		//context.rect( pos.x - this.w/2, pos.y - this.h / 2, this.w, this.h);
		context.fillStyle = "green";
		context.fill();

		context.restore();
		
	}
}