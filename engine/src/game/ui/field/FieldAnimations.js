var FieldAnimations = {};

FieldAnimations.field = null;

FieldAnimations.createExplosion = function(position) {
   var explosion = FieldAnimations.field.addChild( new Sprite.fromPattern("animations/explosion"));
   explosion.tint = 0xffc800;
   explosion.loop = false;
   explosion.gotoAndPlay(0);
   explosion.animationSpeed = 0.24;
   explosion.position.set(position.x, position.y);

   explosion.onComplete = function() {
      this.destroy();
   };
};

FieldAnimations.flyTokenToEnemy = function(token) {
   var tw = new Tween(token, { scale: {x: token.scale.x * 0.8, y: token.scale.y * 0.8}}, 200, { delay: token.index * 50 });
   token.tweenFly = tw;
   
   token.tweenFly.easing(function(k) {
      var kk = TWEEN.Easing.Linear.None(k);
      this._object.y = this._object.position.moveFrom.y + kk * (this._object.position.moveTo.y - this._object.position.moveFrom.y);
      this._object.x = this._object.position.moveFrom.x + kk * (this._object.position.moveTo.x - this._object.position.moveFrom.x);
   });

   token.tweenFly.once('start', function(obj) {
      obj.visible = true;
   });

   return FieldAnimations.completeFlyToEnemy(tw);
};

FieldAnimations.completeFlyToEnemy = function(tw) {
   return  new Promise(function(resolve) {
      tw.once("complete", function(obj) {
         obj.visible = false;
         obj.tweenFly = null;
         
         FieldAnimations.createExplosion({x: obj.position.x, y: obj.position.y});

         resolve(obj);

      });
   })
};

FieldAnimations.flyTokenToHero = function(token) {
   token.tweenFly = new Tween(token, {}, 200, { delay: token.index * 50 });

   token.tweenFly.easing(function(k) {
      var kk = TWEEN.Easing.Back.In(k);
      this._object.y = this._object.position.moveFrom.y + kk * (this._object.position.moveTo.y - this._object.position.moveFrom.y);
      this._object.x = this._object.position.moveFrom.x + kk * (this._object.position.moveTo.x - this._object.position.moveFrom.x);
   });

   token.tweenFly.once("start", function(obj) {
      obj.emit("start_fly", obj);
   });

   return  new Promise(function(resolve) {
      token.tweenFly.once("complete", function(obj) {
         obj.visible = false;
         obj.tweenFly = null;

         resolve({x: obj.position.x, y: obj.position.y});
      });
   });
};