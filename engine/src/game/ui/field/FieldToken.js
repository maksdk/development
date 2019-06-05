function GameToken(tex, width, height) {
   Token.call(this, tex);

   this.allMoves = [];
   this.moves = [];
   this.wrapMoves = [];
   this.tweensStack = [];

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

GameToken.prototype = Object.create(Sprite.prototype);
