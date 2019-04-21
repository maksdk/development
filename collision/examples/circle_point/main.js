window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,

		circle = {
			x: Math.random() * width,
			y: Math.random() * height,
			radius: 25 + Math.random() * 50
		};

	document.body.addEventListener("mousemove", function(event) {

		if(Collider.circlePointCollision(event.clientX, event.clientY, circle)) {
			context.fillStyle = "#f66";
		}
		else {
			context.fillStyle = "#999";
		}

		context.clearRect(0, 0, width, height);
		context.beginPath();
		context.arc(circle.x, circle.y, circle.radius,
					0, Math.PI * 2, false);
		context.fill();
		
	})
	

};