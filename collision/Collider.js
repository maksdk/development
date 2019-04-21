var Collider = {};

Collider.circleCollision = function(circle0, circle1) {
	return Collider.distance(circle0, circle1) <= circle0.radius + circle1.radius;
};

Collider.circlePointCollision = function(pointX, pointY,  circle) {
	return Collider.distanceXY(pointX, pointY, circle.x, circle.y) <= circle.radius;
};

Collider.pointInRect = function(x, y, rect) {
	return Collider.inRange(x, rect.x, rect.x + rect.width) && 
				Collider.inRange(y, rect.y, rect.y + rect.height);
};

Collider.rectIntersect = function(r0, r1) {
	return Collider.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
				Collider.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
};

Collider.rangeIntersect = function(min0, max0, min1, max1) {
	return Math.max(max0, min0) >= Math.min(min1, max1) && 
				Math.min(max0, min0) <= Math.max(max1, min1);
};

Collider.inRange = function(val, min, max) {
	return val >= Math.min(max, min) && val <= Math.max(max, min);
};

Collider.distance = function(obj1, obj2) {
	var dx = obj1.x - obj2.x;
	var dy = obj1.y - obj2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

Collider.distanceXY = function(x0, y0, x1, y1) {
	var dx = x1 - x0;
	var dy = y1 - y0;
	return Math.sqrt(dx * dx + dy * dy);
}


