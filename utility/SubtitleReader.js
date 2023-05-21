import { compile as parseAss } from 'ass-compiler';
import { Cue, parseSync as parseSrt, Node as SrtNode, stringifySync as writeSrt } from 'subtitle';
import { WebVTT } from 'vtt.js';

export default class SubtitleReader {
  async subtitles(files) {
    return (await Promise.all(files.map((f) => this.#subtitles(f))))
      .flatMap((nodes) => nodes)
      .filter((node) => node.textImage !== undefined || node.text !== '')
      .sort((n1, n2) => n1.start - n2.start);
  }

  async #subtitles(file) {
    if (file.name.endsWith('.srt')) {
      const nodes = parseSrt(await file.text());
      return nodes
        .filter((node) => node.type === 'cue')
        .map((node) => {
          const cue = node.data;
          return {
            start: cue.start,
            end: cue.end,
            text: cue.text,
            track: track,
          };
        });
    }

    if (file.name.endsWith('.vtt') || file.name.endsWith('.nfvtt')) {
      return new Promise(async (resolve, reject) => {
        const isFromNetflix = file.name.endsWith('.nfvtt');
        const parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
        const cues = [];
        parser.oncue = (c) => {
          if (isFromNetflix) {
            const lines = c.text.split('\n');
            const newLines = [];

            for (const line of lines) {
              newLines.push(this._fixRTL(line));
            }

            c.text = newLines.join('\n');
          }
          cues.push(c);
        };
        parser.onflush = () =>
          resolve(
            cues.map((c) => ({
              start: Math.floor(c.startTime * 1000),
              end: Math.floor(c.endTime * 1000),
              text: c.text,
              track: track,
            }))
          );
        parser.parse(await file.text());
        parser.flush();
      });
    }

    if (file.name.endsWith('.ass')) {
      const nodes = parseAss(await file.text(), {});
      return nodes.dialogues.map((dialogue) => {
        return {
          start: Math.round(dialogue.start * 1000),
          end: Math.round(dialogue.end * 1000),
          text: dialogue.slices.flatMap((slice) => slice.fragments.map((fragment) => fragment.text)).join(''),
          track: track,
        };
      });
    }
  }
}
