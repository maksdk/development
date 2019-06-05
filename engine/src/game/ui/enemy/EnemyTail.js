function EnemyTail() {
   Sprite.call(this);
   
   this.create()
}

EnemyTail.prototype = Object.create(Sprite.prototype);

EnemyTail.prototype.create = function() {
   this.trail = this.addChild( new ParticlesSprite.create(['ship/trail'], TRAIL_BOARD));
};


EnemyTail.prototype.update = function(delta) {
   if (this.trail) this.trail.update(delata);
};