import State from './State';
import AlarmState from './AlarmState';
import BellState from './BellState';

export default class ClockState extends State {
  mode = 'clock';
  timeType = 'clockTime';
  NextStateClass = AlarmState;

  incrementH() {
    this.clock.incrementH(this.timeType);
  }

  incrementM() {
    this.clock.incrementM(this.timeType);
  }

  tick() {
    if (this.clock.isAlarmOn() && this.clock.isAlarmTime()) {
      this.nextState(BellState);
    }
  }
}