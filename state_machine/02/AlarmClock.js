import ClockState from './ClockState';

export default class AlarmClock {
  clockTime = { minutes: 0, hours: 12 };
  alarmTime = { minutes: 0, hours: 6 };
  alarmOn = false;

  constructor() {
    this.setState(ClockState);
  }

  clickMode() {
    this.state.nextState();
  }

  longClickMode() {
    this.alarmOn = !this.alarmOn;
  }

  clickH() {
    this.state.incrementH();
  }

  clickM() {
    this.state.incrementM();
  }

  tick() {
    this.incrementM('clockTime');
    if (this.clockTime.minutes === 0) {
      this.incrementH('clockTime');
    }
    this.state.tick();
  }

  isAlarmOn() {
    return this.alarmOn;
  }

  isAlarmTime() {
    return this.clockTime.minutes === this.alarmTime.minutes
      && this.clockTime.hours === this.alarmTime.hours;
  }

  minutes() {
    return this.clockTime.minutes;
  }

  hours() {
    return this.clockTime.hours;
  }

  alarmMinutes() {
    return this.alarmTime.minutes;
  }

  alarmHours() {
    return this.alarmTime.hours;
  }

  setState(Klass) {
    this.state = new Klass(this);
  }

  getCurrentMode() {
    return this.state.getModeName();
  }

  incrementH(timeType) {
    const data = this[timeType];
    data.hours = (data.hours + 1) % 24;
  }

  incrementM(timeType) {
    const data = this[timeType];
    data.minutes = (data.minutes + 1) % 60;
  }
}