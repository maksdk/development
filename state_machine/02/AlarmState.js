import State from './State';
import ClockState from './ClockState';
import BellState from './BellState';

export default class AlarmState extends State {
  mode = 'alarm';
  timeType = 'alarmTime';
  NextStateClass = ClockState;

  incrementH() {
    this.clock.incrementH(this.timeType);
  }

  incrementM() {
    this.clock.incrementM(this.timeType);
  }

  tick() {
    if (this.clock.isAlarmTime()) {
      this.nextState(BellState);
    }
  }
}