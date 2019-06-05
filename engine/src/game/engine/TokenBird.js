"use strict";

function TokenBird(tex, width, height) {
   Token.call(this, tex, width, height);

   this.type = TokenBird.type;
   this.bonusID = TokenBird.bonusID;
}

TokenBird.prototype = Object.create(Token.prototype);

TokenBird.type = 'BIRD';
TokenBird.bonusID = 1;
TokenBird.gameField = null;

TokenBird.init = function(field) {
   TokenBird.gameField = field;
};

TokenBird.prototype.onDestroy = function() {
   
};

TokenBird.prototype.destroyB = function(particles) {
   
};
