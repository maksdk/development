function HeroesCont(options) {
   Sprite.call(this);

   this.heroes = [];
   this.trays = [];
   this.countHeores = 3;

   this.styles = {};

   this.createElements();
}

HeroesCont.prototype = Object.create(Sprite.prototype);

HeroesCont.prototype.createElements = function() {
   for(var i = 0; i < this.countHeores; i++) {
      var tray = this.addChild(new Sprite("heroes/trays/" + (i + 1)));
      tray.scale.set(0.5);

      var hero = this.addChild(new Hero({ bitmap: "heroes/" + (i + 1), id: i + 1 }));
      hero.on("hit_enemy", function(e){this.emit("hit_enemy", e)}, this);

      this.trays.push(tray);
      this.heroes.push(hero);
   }
};

HeroesCont.prototype.destroy = function() {
   this.heroes.forEach(function(her) {
      her.destroy();
   });
   this.removeAllListeners();
   this.visible = false;
   // if (this.parent) {
   //    this.parent.removeChild(this);
   // }
   this.heroes = [];
};

HeroesCont.prototype.getHeroes = function() {
   return this.heroes;
};

HeroesCont.prototype.getElemByIndex = function(index) {
   if (this.heroes.length <= index) throw new Error('Such hero is not fond');
   return this.heroes[index];
};

HeroesCont.prototype.getSize = function(id) {
   return this.styles;
};

HeroesCont.prototype.onResize = function(options) {
   if (!this.visible) return;
   
   var maxW = options.width;
   var maxH = options.height;

   var barW = 0;
   var barH = 0;
   
   if (this.heroes && this.heroes[0]) {
      var initX = -Math.floor(this.heroes.length / 2) * this.heroes[0].getSize().width * 1.5;
   } 

   for (var i = 0; i < this.heroes.length; i++) {
      barW += this.heroes[i].getSize().width * 1.5;
      barH += this.heroes[i].getSize().height;

      var x = initX + this.heroes[i].getSize().width * 1.5 * i;

      this.heroes[i].position.set(x, 0);
      this.trays[i].position.set(x, -this.heroes[i].getSize().height * 0.55);
   }

   this.styles.width = barW;
   this.styles.height = barH;

   var barOptions = Utils.fitLayout(maxW, maxH , barW, barH);

   this.scale.set(barOptions.scale);
};