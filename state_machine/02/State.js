export default class State {
  constructor(clock) {
    this.clock = clock;
  }

  nextState(StateKlass) {
    this.clock.setState(StateKlass || this.NextStateClass);
  }

  getModeName() {
    return this.mode;
  }
}