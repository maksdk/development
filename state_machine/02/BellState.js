import ClockState from './ClockState';
import State from './State';

export default class BellState extends State {
  mode = 'bell';
  NextStateClass = ClockState;

  tick() {
    this.nextState();
  }

  incrementH() {
    return false;
  }

  incrementM() {
    return false;
  }
}