function Token(tex, width, height) {
   Sprite.call(this, tex);

   //this.moveFromX = 0;
   //this.moveFromY = 0;
   //this.moveToX = -1;
   //this.moveToY = -1;
  // this.retX = 0;
   //this.retY = 0;
   //this.drag = null;
   //this.dragTo = null;
   
   
   
   //this.tweens = [];

   // NOTE:  valid options 

   this.anchor.set(0.5);

   this.moved = false;
   this.moves = [];

   this.tokenWidth = width;
   this.tokenHeight = height;

   this.tokenID = 0;
   this.tokenX = 0;
   this.tokenY = 0;

   this.inDestroy = false;
}

Token.prototype = Object.create(Sprite.prototype);


Token.prototype.onCompleteMove = function() {
   this.moved = false;
   this.moves = [];
};

Token.prototype.onStartMove = function() {
   this.moved = true;
};

Token.prototype.move = function() {
   var startPos = this.moves[0];
   var endPos = this.moves[this.moves.length - 1];

   var tw = new Tween(this, {
      position: {
         x: endPos.x * this.tokenWidth + this.tokenWidth / 2, 
         y: endPos.y * this.tokenHeight + this.tokenHeight / 2
      }
   }, 250 * this.moves.length);

   return new Promise((function(resolve) {
      tw.once("complete", function() {
         this.onCompleteMove();
      }, this);
   }).bind(this))
};


// FIXME:  test
Token.prototype.animMove = function(moves) {
   var startPos = moves[0];
   var endPos = moves[moves.length - 1];

   var tw = new Tween(this, {
      position: {
         x: endPos.x * this.tokenWidth + this.tokenWidth / 2, 
         y: endPos.y * this.tokenHeight + this.tokenHeight / 2
      }
   }, 250 * moves.length, { autoStart: false });

   return tw;
};

Token.prototype.testMove = function() {
   
   var tweens = [];

   this.moves.forEach(function(moves) {
      var prevTw = tweens[tweens.length - 1];
      var currTw = this.animMove(moves);

      if (prevTw) {
         prevTw.chain(currTw);
      }

      tweens.push(currTw);
   }, this);


   if (tweens.length > 0) {
      var first = tweens[0].start();
      var last = tweens[tweens.length - 1];

      last.once("complete", function() {
         this.onCompleteMove();
         this.emit("completed_move", {token: this});
      }, this);
   }
};
// !



Token.prototype.onStartDestroy = function() {
   this.selected = false;
   this.tokenID = 0;
   this.inDestroy = true;
};

Token.prototype.onCompleteDestroy = function() {
   this.inDestroy = false;
};

Token.prototype.remove = function() {
   var tw = new Tween(this, {scale: {x: 0, y: 0}}, 250);
   
   return new Promise((function(resolve) {
      tw.once("complete", function() {
         this.onCompleteDestroy();
      }, this);
   }).bind(this));
};

Token.prototype.addMove = function(move) {
   this.moves.push(move);
};

Token.prototype.onDestroy = function() {
   
};

Token.prototype.calcX = function(x) {
   return this.tokenWidth * x + this.tokenWidth/2;
};

Token.prototype.calcY = function(y) {
   return this.tokenHeight * y + this.tokenHeight/2;
};
