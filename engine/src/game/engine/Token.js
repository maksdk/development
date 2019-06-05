function Token(tex, width, height) {
   Sprite.call(this, tex);

   this.anchor.set(0.5);
   
   this.tokenID = 0;
   this.tokenX = 0;
   this.tokenY = 0;
   
   this.moved = false;
   this.inDestroy = false;
   
   this.moveFromX = 0;
   this.moveFromY = 0;
   this.moveToX = -1;
   this.moveToY = -1;
   this.retX = 0;
   this.retY = 0;
   this.drag = null;
   this.dragTo = null;
   
   this.tokenWidth = width;
   this.tokenHeight = height;
   
   this.tweens = [];
}

Token.prototype = Object.create(Sprite.prototype);

Token.prototype.onDestroy = function() {
   
};

Token.prototype.calcX = function(x) {
   return this.tokenWidth * x + this.tokenWidth/2;
};

Token.prototype.calcY = function(y) {
   return this.tokenHeight * y + this.tokenHeight/2;
};

Token.prototype.addTween = function(obj, props, delay, ease, onfinish, onchange) {
   var t = Sprite.prototype.addTween.call(this, obj, props, delay, ease, onfinish, onchange);
   this.tweens.push(t);
};

Token.prototype.removeTweens = function() {
   for(var i=0; i<this.tweens.length; i++) {
       this.tweens[i].stop();
   }
   
   this.tweens = [];
};