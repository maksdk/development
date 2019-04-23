const canvas = document.getElementById('tetris');
const contex = canvas.getContext('2d');

contex.scale(20, 20);

const matrix = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0]
];

function collide(arena, player) {
	const [matrix, offset] = [player.matrix, player.pos];

	for (let y = 0; y < matrix.length; ++y) {
		for (let x = 0; x < matrix[y].length; ++x) {
			if (matrix[y][x] !== 0 &&
				(arena[y + offset.y] &&
				arena[y + offset.y][x + offset.x]) !== 0) {
				return true;
			}
		}
	}
	return false;
}

function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

function draw() {
	contex.fillStyle = '#000';
	contex.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(arena, {x: 0, y: 0});
	drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				contex.fillStyle = 'red';
				contex.fillRect(x + offset.x, y + offset.y, 1, 1);
			}
		});
	});
}

function merge(arena, player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		});
	});
}

function playerDrop() {
	player.pos.y += 1;

	if (collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		player.pos.y = 0;
	}
	dropCounter = 0;
}

function playerMove(dir) {
	player.pos.x += dir;
	if (collide(arena, player)) {
		player.pos.x -= dir;
	}
}

function playerRotate(dir) {
	rotate(player.matrix, dir);

}

function rotate(matrix, dir) {
	console.table(matrix, dir)
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < y; x++) {
			[ matrix[x][y], matrix[y][x] ] = [ matrix[y][x], matrix[x][y] ];
		}
	}
	console.table(matrix)
	if (dir > 0) {
		matrix.forEach(row => row.reverse());
	}
	else {
		matrix.reverse();
	}
	console.table(matrix)
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		playerDrop();
	}

	draw();
	requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);


const player = {
	pos: {x: 5, y: 5},
	matrix: matrix
};

document.addEventListener('keydown', e => {
	switch (e.keyCode) {
		case 37:
			playerMove(-1);
			break;
		case 39:
			playerMove(1);
			break;
		case 40:
			playerDrop();
			break;
		case 81:
			playerRotate(-1);
			break;
		case 87:
			playerRotate(1);
			break;
		default:
			break;
	}
})

update()

