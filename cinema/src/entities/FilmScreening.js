import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class FilmScreening extends ApplicationEntity {
	constructor(film, cinemaHall, time) {
		super(film, cinemaHall, time);

		this.id = uuid.create().hex;
		this.cinemaHall = cinemaHall;
		this.film = film;
		this.time = time;
		this.createdAt = new Date();
	}

	static constraints = {
		film: {
			presence: true
		},
		cinemaHall: {
			presence: true
		},
		time: {
			presence: true
		}
	}
	
	valueOf() {
    return this.id;
  }
}