import ApplicationService from './ApplicationService';
import { Film, CinemaHall, FilmScreening } from '../entities';

export default class CinemaService extends ApplicationService {
	createFilm(name, duration) {
		const film = new Film(name, duration);
		
		const errors = this.validate(film);
		if (!errors) {
			this.FilmRepository.save(film);
		}
	
		return [film, errors];
	}

	createCinemaHall(name, cols, rows) {
		const hall = new CinemaHall(name, cols, rows);
		
		const errors = this.validate(hall);
		if (!errors) {
			this.CinemaHallRepository.save(hall);
		}
		
		return [hall, errors];
	}

	createFilmScreening(filmId, cinemaHallId, time) {
		const film = this.FilmRepository.find(filmId);
		const hall = this.CinemaHallRepository.find(cinemaHallId);
		const screening = new FilmScreening(film, hall, time);

		const errors = this.validate(screening);
		if (!errors) {
			this.FilmScreeningRepository.save(screening);
		}
		
		return [screening, errors];
	}
}