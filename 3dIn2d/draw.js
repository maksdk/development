function offsetToCenter(point, canvas) {
	point.x += canvas.width / 2;
	point.y += canvas.height / 2;
}

export function drawPolygon(polygon, context) {
	const first = polygon[0];

	polygon.forEach(point => {
		offsetToCenter(point, context.canvas)
	})

	context.beginPath();
	context.moveTo(first.x, first.y);
	polygon.forEach(point => {
		context.lineTo(point.x, point.y);
	});
	context.lineTo(first.x, first.y);
	context.stroke();
}