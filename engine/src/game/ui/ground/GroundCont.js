function GroundCont() {
   Sprite.call(this);

   this.fl = 2000;
   this.minZ = 100;
   this.startZ = 2000;
   this.endZ = null;

   this._lock = false;
   //this.mainGround = null;

   this.elements = [];
   this.hiddenElements = [];

   //this.createElements();
   this.createElements2();
}

GroundCont.prototype = Object.create(Sprite.prototype);

GroundCont.prototype.createElements2 = function () {
   var children = SCENES_CONFIG.scenes[0].children;

   children.forEach(function (child, index) {
      var side = index % 2 ? 1 : -1;
      if (index === 0) side = 0;

      var ground = this.addChildAt(new GroundFactory(child, side), 0);
      ground.fl = this.fl;
      ground.z = this.startZ + index * 600;
      ground.side = side

      if (index === 0) {
         ground.y = 10;
      }

      if (side === 1) {
         ground.x = Utils.randomInt(-25, -50);
      }
      else if (side === -1) {
         ground.x = Utils.randomInt(25,50);
      }

      this.elements.push(ground);

      this.endZ = ground.z;
   }, this);

};

// GroundCont.prototype.createElements = function() {
//    var baseZ;
//    var spr;
//    var land = LayoutManager.orientation === LayoutManager.LANDSCAPE;
//    var fl = 2000;
//    var windS = land ? LayoutManager.gameHeight : LayoutManager.gameWidth;




//    console.log(children)
//    /*
//    var bigIslands = GAME_CONFIG.GROUNDS.filter(function(ground) {
//       return ground.type === GAME_CONFIG.CONSTANTS.BIG_ISLAND;
//    });

//    bigIslands.forEach(function(item) {
//       this.p = this.addChild(new Sprite());

//       item.children.forEach(function(child) {
//          var chl = this.p.addChildAt(new Sprite(child.bitmap), child.zIndex);
//          chl.position.set(child.pos.x, child.pos.y);
//          chl.anchor.set(child.anchor.x, child.anchor.y);
//          chl.scale.set(child.scale.x, child.scale.y);
//       }, this);

//    },this);

//    this.p.z = 0;
//    this.p.fl = 2000;
//    this.p.side = 1;

//    this.elements.push(this.p);*/

//    spr = this.addChild(new Sprite());
//    var child1 = spr.addChild(new Sprite("ground/1"));
//    var child2 = spr.addChild(new Sprite("ground/3"));

//    child1.anchor.set(0.5, 1);
//    child2.anchor.set(1, 1);

//    child2.height = child1.height;
//    child2.scale.x = child2.scale.y;
//    child2.x = -650;

//    baseZ = 0
//    spr.fl = fl;
//    spr.z = 0;
//    spr.side = 0;


//    var pos = {x:-130, y: 50};
//    var anchor = {x: 1, y: 1};

//    var e = this.addChild(new Sprite("ground/9"));
//    e.position.set(pos.x, pos.y);
//    e.anchor.set(anchor.x, anchor.y);
//    e.z = baseZ - 550;
//    e.side = 1;
//    this.elements.push(e);


//    pos = {x:150, y: 15};
//    anchor = {x: 0, y: 1};
//    e = this.addChild(new Sprite("ground/7"));
//    e.position.set(pos.x, pos.y);
//    e.anchor.set(anchor.x, anchor.y);
//    e.z = baseZ - 450;
//    e.side = -1;
//    this.elements.push(e);

//    this.addChild(spr);
//    this.elements.push(spr);



//    var cont = this.addChild(new Sprite());
//    var c1 = cont.addChild(new Sprite("ground/15"));
//    var c2 = cont.addChild(new Sprite("ground/19"));
//    c1.anchor.set(1);
//    c1.x = -150;
//    c2.anchor.set(1);
//    cont.side = 1;
//    cont.z = baseZ + 500;
//    this.elements.push(cont);


//    cont = this.addChild(new Sprite());
//    c2 = cont.addChild(new Sprite("ground/6"));
//    c1 = cont.addChild(new Sprite("ground/3"));
//    c1.anchor.set(1);
//    c1.x = -150;
//    c2.anchor.set(1);
//    cont.side = 1;
//    cont.z = baseZ + 1000;
//    this.elements.push(cont);


//    cont = this.addChild(new Sprite());
//    c3 = cont.addChild(new Sprite("ground/6"));
//    c2 = cont.addChild(new Sprite("ground/16"));
//    c1 = cont.addChild(new Sprite("ground/12"));
//    c1.anchor.set(1);
//    c1.x = -190;
//    c2.anchor.set(1);
//    c3.anchor.set(1);
//    c3.x = -350
//    cont.side = 1;
//    cont.z = baseZ + 1500;
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/15"));
//    c2 = cont.addChild(new Sprite("ground/2"));
//    c3 = cont.addChild(new Sprite("ground/5"));
//    c1.x = -260;
//    c2.x = -150;
//    cont.side = 1;
//    cont.z = baseZ + 2000;
//    this.elements.push(cont);

//    c1.anchor.set(1);
//    c2.anchor.set(1);
//    c3.anchor.set(1);



//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/3"));
//    c2 = cont.addChild(new Sprite("ground/4"));
//    c3 = cont.addChild(new Sprite("ground/8"));
//    c1.x = -260;
//    c2.x = -150;
//    cont.side = 1;
//    cont.z = baseZ + 2500;
//    this.elements.push(cont);

//    c1.anchor.set(1);
//    c2.anchor.set(1);
//    c3.anchor.set(1);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/17"));
//    c2 = cont.addChild(new Sprite("ground/12"));
//    c3 = cont.addChild(new Sprite("ground/12"));

//    c1.x = -120;
//    c2.x = -270;

//    cont.side = 1;
//    cont.z = baseZ + 3000;

//    c1.anchor.set(1);
//    c2.anchor.set(1);
//    c3.anchor.set(1);
//    this.elements.push(cont);



//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/2"));
//    c2 = cont.addChild(new Sprite("ground/7"));
//    c3 = cont.addChild(new Sprite("ground/8"));

//    c1.x = -230;
//    c2.x = -70;

//    cont.side = 1;
//    cont.z = baseZ + 3500;

//    c1.anchor.set(1);
//    c2.anchor.set(1);
//    c3.anchor.set(1);
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/18"));
//    c2 = cont.addChild(new Sprite("ground/15"));

//    c2.x = -200;

//    cont.side = 1;
//    cont.z = baseZ + 4000;

//    c1.anchor.set(1);
//    c2.anchor.set(1);
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/3"));
//    c2 = cont.addChild(new Sprite("ground/4"));

//    c1.x = -200;

//    cont.side = 1;
//    cont.z = baseZ + 4500;

//    c1.anchor.set(1);
//    c2.anchor.set(1);
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/20"));
//    c2 = cont.addChild(new Sprite("ground/25"));
//    c3 = cont.addChild(new Sprite("ground/2"));
//    c1.x = -350;
//    c2.x = -150;
//    cont.side = 1;
//    cont.z = baseZ + 5000;
//    c1.anchor.set(1);
//    c2.anchor.set(1);
//    c3.anchor.set(1);
//    this.elements.push(cont);












//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/20"));
//    c2 = cont.addChild(new Sprite("ground/3"));
//    c2.x = 270;

//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    cont.side = -1;
//    cont.z = baseZ + 400;
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/24"));
//    c2 = cont.addChild(new Sprite("ground/25"));
//    c2.x = 250;

//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    cont.side = -1;
//    cont.z = baseZ + 900;
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/21"));
//    c2 = cont.addChild(new Sprite("ground/15"));
//    c2.x = 530;
//    c2.scale.x = -1;
//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    cont.side = -1;
//    cont.z = baseZ + 1400;
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/6"));
//    c2 = cont.addChild(new Sprite("ground/15"));
//    c2.x = 530;
//    c2.scale.x = -1;
//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    cont.side = -1;
//    cont.z = baseZ + 1900;
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/25"));
//    c2 = cont.addChild(new Sprite("ground/15"));
//    c2.x = 490;
//    c2.scale.x = -1;
//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    cont.side = -1;
//    cont.z = baseZ + 2400;
//    this.elements.push(cont);


//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/20"));
//    c2 = cont.addChild(new Sprite("ground/3"));

//    c1.x = 0;
//    c2.x = 270;

//    cont.side = -1;
//    cont.z = baseZ + 2900;

//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);

//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/23"));
//    c2 = cont.addChild(new Sprite("ground/6"));
//    c1.x = 0;
//    c2.x = 210;
//    cont.side = -1;
//    cont.z = baseZ + 3400;
//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/21"));
//    c2 = cont.addChild(new Sprite("ground/12"));

//    c2.x = 250;

//    cont.side = -1;
//    cont.z = baseZ + 3900;
//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/5"));
//    c2 = cont.addChild(new Sprite("ground/3"));

//    c2.x = 100;

//    cont.side = -1;
//    cont.z = baseZ + 4400;
//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/2"));
//    c2 = cont.addChild(new Sprite("ground/25"));
//    c3 = cont.addChild(new Sprite("ground/7"));

//    c2.x = 250;
//    c3.x = 100;

//    cont.side = -1;
//    cont.z = baseZ + 4900; 
//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);
//    c3.anchor.set(0, 1);
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c1 = cont.addChild(new Sprite("ground/9"));
//    c2 = cont.addChild(new Sprite("ground/20"));

//    c2.x = 180;
//    c3.x = 100;

//    cont.side = -1;
//    cont.z = baseZ + 5400;
//    c1.anchor.set(0, 1);
//    c2.anchor.set(0, 1);

//    this.elements.push(cont);


//    cont = this.addChild(new Sprite());
//    c = cont.addChild(new Sprite("ground/7"));
//    cont.side = -1;
//    cont.z = baseZ + 10000;
//    c.anchor.set(0, 1);
//    cont.pivot.x = -550;
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c = cont.addChild(new Sprite("ground/9"));
//    cont.side = 1;
//    cont.z = baseZ +11600;
//    c.anchor.set(1, 1);
//    cont.pivot.x = 770;
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c = cont.addChild(new Sprite("ground/10"));
//    cont.side = -1;
//    cont.z = baseZ + 13500;
//    c.anchor.set(0, 1);
//    cont.pivot.x = -950;
//    this.elements.push(cont);

//    cont = this.addChild(new Sprite());
//    c = cont.addChild(new Sprite("ground/9"));
//    cont.side = 1;
//    cont.z = baseZ + 14000;
//    c.anchor.set(1, 1);
//    cont.pivot.x = 540;
//    this.elements.push(cont);



//    for (var i = this.elements.length - 1; i >= 0; i -= 1) {
//       this.addChild(this.elements[i]);
//       // if (this.elements[i].side === 1) {
//       //    this.elements[i].pivot.x = 20;
//       // }
//       // else if(this.elements[i].side === 1){
//       //    this.elements[i].pivot.x = -20;
//       // }
//    }
// };

GroundCont.prototype.moveMountains = function (speed) {
   for (var i = 0; i < this.elements.length; i++) {

      var ground = this.elements[i];
      if (!ground) continue;

      ground.z -= speed;

      var perspective = this.fl / (this.fl + ground.z);
      ground.scale.set(perspective, perspective);

      ground.pivot.x += ground.side * (perspective / 18) * speed;
      ground.pivot.y += -perspective / 35 * speed;

      if (this.fl + ground.z < this.minZ) {

         if (ground.side === 0) {
            this.removeChild(ground);
            this.elements[i] = null;
         }
         else {
            ground.visible = false;

            ground.z = this.endZ - 3000;
            ground.pivot.x = 0;
            ground.pivot.y = 0;
            ground.alpha = 0;

            this.addChildAt(ground, 0);

            new Tween(ground, {alpha: 1}, 500)
               .once("start", function(obj) {
                  obj.visible = true;
               });

            this.hiddenElements.push(ground);
            this.elements[i] = null;
         }
      }
   }

   if (this.hiddenElements.length) {
      var filteredElements = this.elements.filter(function (elem) {
         return elem;
      });

      filteredElements = filteredElements.concat(this.hiddenElements);

      this.elements = filteredElements;
      this.hiddenElements = [];
   }
};

GroundCont.prototype.destroy = function () {
   this._lock = true;
   this.visible = false;
   if (this.parent) {
      this.parent.removeChild(this);
   }
};

GroundCont.prototype.move = function (speed, speedX) {
   if (this._lock) return;

   this.moveMountains(speed);
};
