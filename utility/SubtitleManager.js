export default class SubtitleManager {

  constructor(subtitles) {
    this.subtitles = subtitles;
  }

  findSubtitleAt(time) {
    return this.subtitles.filter(sub => sub.start < time && sub.end > time);
  }
}
