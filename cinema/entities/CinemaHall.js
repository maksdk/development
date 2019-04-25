import uuid from 'uuid-js';

export default class CinemaHall {
	constructor(name, rows, cols) {
		this.id = uuid.create().toString();
		this.cols = cols;
		this.rows = rows;
		this.name = name;
		this.createdAt = new Date();
		this.filmScreenings = [];
	}

	addFilmScreening(screen) {
		this.filmScreenings.push(screen);
	}
}