window.onload = function() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	window.Engine = Matter.Engine;
	window.World = Matter.World;
	window.Bodies = Matter.Bodies;
	window.Events = Matter.Events;

	var engine;
	var world;
	var ground;
	var boxes = [];
	var boundaries = [];
	var circles = [];
	window.circles = circles;


	function setup() {
		engine = Engine.create();
		world = engine.world;
		window._world = world;
		Engine.run(engine);

		// boundaries.push(new Boundary(100, 100,  100, 10, Math.PI / 5, world));
		// boundaries.push(new Boundary(250, 300,  150, 10, -Math.PI / 5, world));

		// Events.on(engine, 'collisionStart', function(event) {
	 //     console.log("Evento: ", event)
	 //     var pairs = event.pairs;
	 //     console.log("Pair no visible: ", pairs)
	 //     console.log("Pair visible: ", pairs[0]);
	 //     console.log("colision between " + pairs[0].bodyA.label + " - " + pairs[0].bodyB.label);
		// });
	}



	function mousePress(e) {
	//boxes.push(new Box(e.clientX, e.clientY, 20, 20, world));
		circles.push(new Circle(e.clientX, e.clientY, 5, world))
	}

	function draw() {
		//Engine.update(engine);

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#9ea7b8";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < boxes.length; i++) {
			boxes[i].show(context);
			

    }

    for (var i = 0; i < circles.length; i++) {
			
			if (circles[i].isOnScreen(canvas.height)) {
				circles[i].removeFromWorld()
				circles.splice(i, 1);
				
				i -= 1;
				continue;
			}
			circles[i].show(context);
    }

    for (var i = 0; i < boundaries.length; i++) {
			boundaries[i].show(context);
    }

    // if (engine.pairs.list && engine.pairs.list[0]) {
    // 	console.log(engine.pairs.list[0].collision)
    // }
    
  
		requestAnimationFrame(draw);
	}

	setup();
	draw();
	document.addEventListener('click', e => mousePress(e));
}

