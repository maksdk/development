var Vector = {
	_x:1,
	_y:0,

	create: function(x,y){
		var newVec = Object.create(this);
		newVec.setX(x);
		newVec.setY(y);
		return newVec;
	},
	setX: function(x){
		this._x = x;
	},
	getX: function(){
		return this._x;
	},
	setY: function(y){
		this._y = y;
	},
	getY: function(){
		return this._y;
	},
	setAngle: function(angle){
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},
	getAngle: function(){
		return Math.atan2(this._y, this._x);
	},
	setLength: function(length){
		var angle = this.getAngle();

		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},
	getLength: function(){
		return Math.sqrt(this._x*this._x + this._y*this._y);
	},
	add: function(v2){
		return Vector.create(this._x + v2.getX(), this._y + v2.getY());
	},
	subtract: function(v2){
		return Vector.create(this._x - v2.getX(), this._y - v2.getY());
	},
	multiply: function(val){
		return Vector.create(this._x * val, this._y * val);
	},
	divide: function(val){
		return Vector.create(this._x / val, this._y / val);
	},
	addTo: function(v2){
		this._x += v2.getX();
		this._y += v2.getY();
	},
	subtractFrom: function(v2){
		this._x -= v2.getX();
		this._y -= v2.getY();
	},
	multiplyBy: function(val){
		this._x *= val;
		this._y *= val;
	},
	divideBy: function(val){
		this._x /= val;
		this._y /= val;
	}
};