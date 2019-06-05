function GroundFactory(options, side) {
   Sprite.call(this);

   this._children = options.children;
   this._side = side;

   this.elements = [];

   this.create();
}

GroundFactory.prototype = Object.create(Sprite.prototype);

GroundFactory.prototype.create = function () {

   this._children.sort(function (a, b) {
      var a1 = a.zIndex * 1;
      var b1 = b.zIndex * 1;

      if (a1 > b1) return 1;
      else if (a1 < b1) return -1;
      return 0;
   });

   this._children.forEach(function (child) {

      var bitmap = child.imageName;
      var anchor = child._layouts.portrait.anchor;

      var pivot = child._layouts.portrait.pivot;


      // FIXME:   переделать
      var scale = child._layouts.portrait.scale;
      var pos = child._layouts.portrait.position;
      if (this._side === -1) {
         pos.x = pos.x * -1;
         scale.x = scale.x * -1;
      }
      ///////////////////////////


      var ground = this.addChild(new Sprite(bitmap));
      ground.position.set(pos.x, pos.y);
      ground.anchor.set(anchor.x, anchor.y);
      ground.scale.set(scale.x, scale.y);
      ground.pivot.set(pivot.x, pivot.y);
      ground.zIndex = child.zIndex;

      this.elements.push(ground);
   }, this);
};