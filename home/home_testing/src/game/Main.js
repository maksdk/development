function Main() {
	GameWindow.call(this);

	this.bar = null;

	this.createElements();
}

Main.prototype = Object.create(GameWindow.prototype);

Main.prototype.createElements = function() {
	this.bar = this.addChild(new Bar());
};

Main.prototype.onResize = function() {
	var w = LayoutManager.gameWidth,
		h = LayoutManager.gameHeight,
		land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

	if (land) {

	}
	else {

	}
};