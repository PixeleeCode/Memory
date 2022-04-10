export default class Timer {
  timer: number | undefined;

  minutes = 0;

  seconds = 0;

  el: HTMLElement | null;

  constructor(el: string) {
    this.el = document.querySelector(el);
  }

  /**
   * Start a chrono
   */
  start = () => {
    if (undefined === this.timer) {
      this.timer = setInterval(() => {
        this.increment();
      }, 1000);
    }
  };

  /**
   * Stop a chrono
   */
  stop = () => {
    clearInterval(this.timer);
    this.timer = undefined;
  };

  /**
   * Reset a chrono
   */
  reset = () => {
    this.minutes = 0;
    this.seconds = 0;
    this.increment();
  };

  /**
   * Increment a chrono
   *
   * @return {string}
   */
  increment = () => {
    this.seconds += 1;

    if (this.seconds === 60) {
      this.minutes += 1;
      this.seconds = 0;
    }

    const minutesString: string = `0${this.minutes}`.slice(-2);
    const secondsString: string = `0${this.seconds}`.slice(-2);

    if (this.el !== null) {
      this.el.innerText = `${minutesString}:${secondsString}`;
    }
  };
}
