export default class Timer {
    constructor(el) {
        this.minutes = 0;
        this.seconds = 0;
        /**
         * Start a chrono
         */
        this.start = () => {
            if (undefined === this.timer) {
                this.timer = setInterval(() => {
                    this.increment();
                }, 1000);
            }
        };
        /**
         * Stop a chrono
         */
        this.stop = () => {
            clearInterval(this.timer);
            this.timer = undefined;
        };
        /**
         * Reset a chrono
         */
        this.reset = () => {
            this.minutes = 0;
            this.seconds = 0;
            this.increment();
        };
        /**
         * Increment a chrono
         *
         * @return {string}
         */
        this.increment = () => {
            this.seconds += 1;
            if (this.seconds === 60) {
                this.minutes += 1;
                this.seconds = 0;
            }
            const minutesString = `0${this.minutes}`.slice(-2);
            const secondsString = `0${this.seconds}`.slice(-2);
            if (this.el !== null) {
                this.el.innerText = `${minutesString}:${secondsString}`;
            }
        };
        this.el = document.querySelector(el);
    }
}
