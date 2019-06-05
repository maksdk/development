"use strict";

function BottomArrow() {
   Sprite.call(this);

   this.createElements();

   this.scale.set(0.9, 0.8);
}

BottomArrow.prototype = Object.create(Sprite.prototype);

BottomArrow.prototype.createElements = function() {
   var label = this.addChild(new Sprite("boosters/bottom-label"));
   var arrow = this.addChild(new Sprite("boosters/arrow"));
};

BottomArrow.prototype.onResize = function() {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   if (land) {

   }
   else {
      
   }
};

BottomArrow.prototype.tick = function(delta) {

};