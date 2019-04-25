import uuid from 'uuid-js';

export default class FilmScreening {
	constructor(film, cinemaHall, time) {
		this.id = uuid.create().toString();
		this.cinemaHall = cinemaHall;
		this.film = film;
		this.time = time;
		this.createdAt = new Date();
	}
}