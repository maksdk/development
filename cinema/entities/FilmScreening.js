import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class FilmScreening extends ApplicationEntity {
	constructor(film, cinemaHall, time) {
		super(film, cinemaHall, time);

		this.id = uuid.create().toString();
		this.cinemaHall = cinemaHall;
		this.film = film;
		this.time = time;
		this.createdAt = new Date();
	}
}