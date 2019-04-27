import uuid from 'uuid-js';
import ApplicationEntyti from '../ApplicationEntity';

let placeA = null;

export default class Ticket extends ApplicationEntyti {
	constructor(filmScreening, user, place) {
		super();
		this.filmScreening = filmScreening;
		this.user = user;
		this.place = place;
		this.id = uuid.create().hex;
		this.createdAt = new Date();

		placeA = place;
	}

	static constraints = {
		filmScreening: {
		 	presence: true,
		 	uniqueness: {
		 		scope: 'place'
		 	}
		},
		user: {
			presence: true
		},
		place: {
			presence: true
		}
	}
}