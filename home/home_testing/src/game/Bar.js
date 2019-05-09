function Bar() {
	Sprite.call(this);

	this.cake = null;
	this.paw = null;

	this.createElements();
}

Bar.prototype = Object.create(Sprite.prototype);

Bar.prototype.createElements = function() {
	this.paw = this.addChild(new Sprite('shelf/paw'));
	this.cake = this.addChild(new Cake());
	
};

