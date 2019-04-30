var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

document.addEventListener('click', e => mousePress(e));

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Events = Matter.Events;
var Constraint = Matter.Constraint;

var engine;
var world;
var particles = [];
var boundaries = [];

function setup() {
	engine = Engine.create();
	world = engine.world;
	//Engine.run(engine);

	var prev = null;
	for (var x = 80; x < 380; x += 40) {
		var fixed = false;
		if (!prev) {
			fixed = true;
		}

		var p = new Particle(x, 50, 10, fixed);
		particles.push(p);

		if (prev) {
			var options = {
				bodyA: p.body,
				bodyB: prev.body,
				length: 40,
				stiffness: 0.4
			};

			var constraint = Constraint.create(options);
			World.add(world, constraint)
		}
		
		prev = p;
	}
	

	

	

	boundaries.push(new Boundary(200, 300,  150, 50, 0, world));
}

function mousePress(e) {
//boxes.push(new Box(e.clientX, e.clientY, 20, 20, world));
	particles.push(new Particle(e.clientX, e.clientY, 5, world))
}

function update() {
	Engine.update(engine);

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#9ea7b8";
  context.fillRect(0, 0, canvas.width, canvas.height);

  lineDraw(particles[0].body.position, particles[1].body.position, context)

  for (var i = 0; i < boundaries.length; i++) {
		boundaries[i].show(context);
  }

  for (var i = 0; i < particles.length; i++) {
		// if (particles[i].isOnScreen(canvas.height)) {
		// 	//particles[i].removeFromWorld()
		// 	//particles.splice(i, 1);
			
		// 	i -= 1;
		// 	continue;
		// }
		particles[i].show(context);
  }

  

	requestAnimationFrame(update);
}

function lineDraw(p1, p2, context) {
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.strokeStyle = '#000';
	context.lineWidth = 2;
	context.stroke();
}

setup();
update();