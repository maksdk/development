function CloudsCont() {
   Sprite.call(this);

   this.cludsMask = null;

   this.countClouds = 8;
   this.clouds = [];
   this.hiddenClouds = [];

   this.fl = 2000;
   this.startZ = 8000;
   this.endZ = null;

   this.create();
   this.onResize();
}

CloudsCont.prototype = Object.create(Sprite.prototype);

CloudsCont.prototype.create = function() {
   this.cludsMask = this.addChild(new PIXI.Graphics())
      .beginFill()
      .drawRect(0,0,1,1)
      .endFill();
   this.mask = this.cludsMask;

   for(var i = 0; i < this.countClouds; i++) {
      var num = i % 2 ? 1 : 2;
      var cloud = this.addChild(new Sprite("clouds/" + num));
      cloud.anchor.set(0.5, 0);

      cloud.x = Utils.randomInt(-LayoutManager.gameWidth * 0.3, LayoutManager.gameWidth * 0.3);
      cloud.y = Utils.randomInt(-LayoutManager.gameHeight * 0.15, 0);
      cloud.alpha = 0.8;
      cloud.z = this.startZ + i * 500;

      this.clouds.push(cloud);
      this.endZ = cloud.z;
   }
};

CloudsCont.prototype.onResize = function() {
   var gh = LayoutManager.gameHeight,
      gw = LayoutManager.gameWidth,
      land = LayoutManager.orientation === LayoutManager.LANDSCAPE;

   this.cludsMask.width = gw;
   this.cludsMask.height = gh * 0.25;

   this.cludsMask.x = -gw * 0.5;
   this.cludsMask.y = -gh * 0.25;

   if (land) {

   }
   else {

   }
   
};

CloudsCont.prototype.move = function(speed) {
   this.clouds.forEach(function(cloud, index) {
      cloud.z -= speed;

      var perspective = this.fl / (this.fl + cloud.z);
      cloud.scale.set(perspective, perspective);

      cloud.pivot.y += perspective * speed;

      if (cloud.pivot.y >= LayoutManager.gameHeight * 0.75) {

         cloud.z = this.startZ;
         cloud.pivot.x = 0;
         cloud.pivot.y = 0;
         cloud.alpha = 0;

         cloud.x = Utils.randomInt(-LayoutManager.gameWidth * 0.3, LayoutManager.gameWidth * 0.3);

         this.addChildAt(cloud, 0);

         var tw1 = new Tween(cloud, {alpha: 0}, 400);
         var tw2 = new Tween(cloud, {alpha: 1}, 500, {autoStart: false});
         tw1.chain(tw2);
      }
   }, this);
};
