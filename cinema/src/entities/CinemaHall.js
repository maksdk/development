import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity'

export default class CinemaHall extends ApplicationEntity {
	constructor(name, rows, cols) {
		super();
		
		this.id = uuid.create().hex;
		this.cols = cols;
		this.rows = rows;
		this.name = name;
		this.createdAt = new Date();
		this.filmScreenings = [];
	}

	static constraints = {
		name: {
		 	presence: true
		},
		rows: {
			presence: true,
			numericality: {
				onlyInteger: true
			}
		},
		rows: {
			presence: true,
			numericality: {
				onlyInteger: true
			}
		}
	}
}