function Cake() {
	Sprite.call(this);
	
	this.ids = {
		port: "cake_portrait",
		land: "cake_landscape"
	};

	this.defaultStyles = {
		width: null,
		height: null,
		x: null,
		y: null
	};

	this.createElements();
	//this.initDefaultStyles();

	Game.on('preloadComplete', function(){
		//this.setStyles();
	}, this);
};

Cake.prototype = Object.create(Sprite.prototype);

Cake.prototype.createElements = function() {
	this.cake = this.addChild(new Sprite('cakes/blue1'));
};

Cake.prototype.setStyles = function() {
	var w = LayoutManager.gameWidth,
		h = LayoutManager.gameHeight,
		land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

	var styles = land 
		? Game.vungleStyles[this.ids.land] 
		: Game.vungleStyles[this.ids.port];

	if (land) {

	}
};