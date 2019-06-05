function Star() {
   Sprite.call(this);

   this.starGraph = null;

   this.createElements();

   this.rotation = -Math.PI / 10;
   this.visible = false;
}

Star.prototype = Object.create(Sprite.prototype);

Star.prototype.createElements = function() {
   var land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   var maxRadius = land 
      ? LayoutManager.gameWidth 
      : LayoutManager.gameHeight; 

   var points = this.getPolygonPoints(0, 0, 5, maxRadius, maxRadius*0.6, 0);

   this.starGraph = this.addChild(new PIXI.Graphics())
      .beginFill(0x000000, 0.5)
      .drawPolygon(points)
      .endFill();
};

Star.prototype.run = function() {
   var tw = new Tween(this.starGraph, {scale: {x: 0.01, y: 0.01}}, 600)
      .once("start", function(obj) {
         this.visible = true;
      }, this)
   return tw;
};

Star.prototype.getPolygonPoints = function(x, y, points, radius, innerRadius, rotation) {
   innerRadius = innerRadius || radius / 2;
   
   var startAngle = (-1 * Math.PI / 2) + rotation;
   var len = points * 2;
   var delta = Math.PI * 2 / len;
   var polygon = [];

   for (var i = 0; i < len; i++) {
      var r = i % 2 ? innerRadius : radius;
      var angle = (i * delta) + startAngle;

      polygon.push(
         x + (r * Math.cos(angle)),
         y + (r * Math.sin(angle))
      );
   }
   return polygon;
};

Star.prototype.onResize = function() {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   if (land) {

   }
   else {
      
   }
};

 

Star.prototype.tick = function(delta) {

};