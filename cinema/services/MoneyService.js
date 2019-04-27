import ApplicationService from './ApplicationService';
import { FilmScreeningTicket } from '../entities';

export default class MoneyService extends ApplicationService {
	buyTicket(filmScreenId, userId, place) {
		if (!filmScreenId || !userId || !place) throw new Error('Yo');
		const ticket = new FilmScreeningTicket(filmScreenId, userId, place);
		const errors = this.validate(ticket);

		if (!errors) {
			this.TicketRepository.save(ticket);
		}

		return [ ticket, errors ];
	}
}