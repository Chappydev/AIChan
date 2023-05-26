export default class Clock {
  #videoDuration;
  #savedTime;
  #startTime;

  constructor(videoDuration) {
    this.#videoDuration = videoDuration;
    this.#savedTime = 0;
    this.#startTime;
  }

  #getElapsed() {
    if (this.#startTime === undefined) {
      return 0;
    }

    const elapsed = Date.now() - this.#startTime;
    this.#startTime = Date.now();
    if (elapsed >= this.#videoDuration) {
      return this.#videoDuration;
    }
    return elapsed;
  }

  start() {
    this.#startTime = Date.now();
  }

  getTime() {
    return this.#savedTime += this.#getElapsed();
  }

  pause() {
    this.#savedTime += this.#getElapsed();
    this.#startTime = undefined;
  }

  setTime(time) {
    this.#savedTime = time;
    this.#startTime = Date.now();
  }
}
