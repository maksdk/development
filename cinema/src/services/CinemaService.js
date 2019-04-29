import ApplicationService from './ApplicationService';
import { Film, CinemaHall, FilmScreening } from '../entities';

export default class CinemaService extends ApplicationService {
	createFilm(name, duration) {
		const film = new this.entities.Film(name, duration);
		
		const errors = this.validate(film);
		if (!errors) {
			this.repositories.film.save(film);
		}
	
		return [film, errors];
	}

	createCinemaHall(name, cols, rows) {
		const hall = new this.entities.CinemaHall(name, cols, rows);
		
		const errors = this.validate(hall);
		if (!errors) {
			this.repositories.cinemaHall.save(hall);
		}
		
		return [hall, errors];
	}

	createFilmScreening(filmId, cinemaHallId, time) {
    const film = this.repositories.film.find(filmId);
    const hall = this.repositories.cinemaHall.find(cinemaHallId);
    const filmScreening = new this.entities.FilmScreening(film, hall, time);
    const errors = this.validate(filmScreening);
    if (!errors) {
      this.repositories.filmScreening.save(filmScreening);
    }
    return [filmScreening, errors];
  }
}