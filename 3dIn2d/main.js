import { square, doubleSquare } from './modals.js';
import { drawPolygon } from './draw.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);
context.fill();

context.strokeStyle = '#fff';


const mesh = toMesh(doubleSquare);

console.log(mesh)

mesh.forEach(polygon => {
	polygon.forEach(point => {
		perspective(point, 50);
		zoom(point, 5)
	})
	drawPolygon(polygon, context);
})

function perspective(point, distance) {
	const fov = point.z + distance;
	point.x /= fov;
	point.y /= fov;
}

function zoom(point, factor) {
	const scale = Math.pow(factor, 2);
	point.x *= scale;
	point.y *= scale;
}

function toMesh(shape) {
	return shape.map(toPolygon)
}

function toPolygon(shape) {
	return shape.map(toPoint);;
}

function toPoint(values) {
	return {
		x: values[0],
		y: values[1],
		z: values[2]
	};
}

