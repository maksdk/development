function line(p1, p2, context) {
	context.beginPath();
	context.moveTo(p1.x, p1.y);
	context.lineTo(p2.x, p2.y);
	context.strokeStyle = 'red';
	context.lineWidth = 3;
	context.stroke();
}