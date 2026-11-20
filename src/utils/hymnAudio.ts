import type { HymnData } from '../data/memorialData';

interface NoteStep {
  midi: number;
  beats: number;
}

// Authentic hymn melodies (MIDI note numbers, 0 = rest)
const HYMN_SCORES: Record<HymnData['id'], { tempoBpm: number; notes: NoteStep[] }> = {
  // KJ 453: "What a Friend We Have in Jesus" (F Major)
  kj453: {
    tempoBpm: 76,
    notes: [
      { midi: 69, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 65, beats: 1 },
      { midi: 62, beats: 2 },
      { midi: 60, beats: 1 },
      { midi: 65, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 65, beats: 1 },
      { midi: 65, beats: 1 },
      { midi: 67, beats: 2 },
      { midi: 69, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 65, beats: 1 },
      { midi: 62, beats: 2 },
      { midi: 60, beats: 1 },
      { midi: 65, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 65, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 65, beats: 3 },
    ],
  },
  // NKB 128: "I Surrender All" (D Major)
  nkb128: {
    tempoBpm: 74,
    notes: [
      { midi: 66, beats: 1 },
      { midi: 66, beats: 0.5 },
      { midi: 67, beats: 0.5 },
      { midi: 66, beats: 1 },
      { midi: 64, beats: 1 },
      { midi: 62, beats: 2 },
      { midi: 69, beats: 1 },
      { midi: 69, beats: 0.5 },
      { midi: 71, beats: 0.5 },
      { midi: 69, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 66, beats: 2 },
      { midi: 66, beats: 1 },
      { midi: 66, beats: 0.5 },
      { midi: 67, beats: 0.5 },
      { midi: 69, beats: 1 },
      { midi: 71, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 66, beats: 1 },
      { midi: 64, beats: 1 },
      { midi: 62, beats: 3 },
    ],
  },
  // KJ 416: "God Will Take Care of You" (Bb Major)
  kj416: {
    tempoBpm: 72,
    notes: [
      { midi: 65, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 65, beats: 2 },
      { midi: 65, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 72, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 69, beats: 2 },
      { midi: 65, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 67, beats: 1 },
      { midi: 65, beats: 2 },
      { midi: 67, beats: 1 },
      { midi: 69, beats: 1 },
      { midi: 70, beats: 1 },
      { midi: 72, beats: 1 },
      { midi: 70, beats: 3 },
    ],
  },
};

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

class HymnAudioEngine {
  private ctx: AudioContext | null = null;
  private activeHymnId: HymnData['id'] | null = null;
  private isPlaying = false;
  private timerIds: number[] = [];
  private activeNodes: AudioNode[] = [];
  private listeners = new Set<(state: { hymnId: HymnData['id'] | null; isPlaying: boolean; progress: number }) => void>();
  private progress = 0;

  subscribe(fn: (state: { hymnId: HymnData['id'] | null; isPlaying: boolean; progress: number }) => void) {
    this.listeners.add(fn);
    fn({ hymnId: this.activeHymnId, isPlaying: this.isPlaying, progress: this.progress });
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) =>
      fn({ hymnId: this.activeHymnId, isPlaying: this.isPlaying, progress: this.progress })
    );
  }

  stop() {
    this.timerIds.forEach((id) => window.clearTimeout(id));
    this.timerIds = [];
    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch {
        // Ignore already stopped nodes
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.progress = 0;
    this.activeHymnId = null;
    this.emit();
  }

  toggle(hymnId: HymnData['id']) {
    if (this.isPlaying && this.activeHymnId === hymnId) {
      this.stop();
      return;
    }
    this.play(hymnId);
  }

  play(hymnId: HymnData['id']) {
    this.stop();

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    const score = HYMN_SCORES[hymnId];
    if (!score) return;

    this.activeHymnId = hymnId;
    this.isPlaying = true;
    this.progress = 0;
    this.emit();

    const beatSec = 60 / score.tempoBpm;
    const totalBeats = score.notes.reduce((sum, n) => sum + n.beats, 0);
    let elapsedBeats = 0;
    const startAt = this.ctx.currentTime + 0.08;

    // Master warm sanctuary lowpass filter
    const masterFilter = this.ctx.createBiquadFilter();
    masterFilter.type = 'lowpass';
    masterFilter.frequency.setValueAtTime(1600, startAt);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.24, startAt);

    masterFilter.connect(masterGain);
    masterGain.connect(this.ctx.destination);
    this.activeNodes.push(masterFilter, masterGain);

    score.notes.forEach((note) => {
      const noteStart = startAt + elapsedBeats * beatSec;
      const noteDur = note.beats * beatSec;

      if (note.midi > 0 && this.ctx) {
        const freq = midiToFreq(note.midi);
        const bassFreq = midiToFreq(note.midi - 12);

        this.scheduleOrganVoice(this.ctx, masterFilter, freq, noteStart, noteDur, 0.45);
        // Gentle sub-octave choir pad
        this.scheduleOrganVoice(this.ctx, masterFilter, bassFreq, noteStart, noteDur, 0.25);
      }

      const progressPct = Math.min(100, Math.round(((elapsedBeats + note.beats) / totalBeats) * 100));
      const delayMs = Math.max(0, (elapsedBeats * beatSec) * 1000);
      const tId = window.setTimeout(() => {
        if (this.activeHymnId === hymnId && this.isPlaying) {
          this.progress = progressPct;
          this.emit();
        }
      }, delayMs);
      this.timerIds.push(tId);

      elapsedBeats += note.beats;
    });

    const totalMs = elapsedBeats * beatSec * 1000 + 350;
    const endTimer = window.setTimeout(() => {
      if (this.activeHymnId === hymnId) {
        this.stop();
      }
    }, totalMs);
    this.timerIds.push(endTimer);
  }

  private scheduleOrganVoice(
    ctx: AudioContext,
    destination: AudioNode,
    freq: number,
    startTime: number,
    duration: number,
    peakGain: number
  ) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const env = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.0015, startTime);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.28, startTime);

    const attack = Math.min(0.09, duration * 0.2);
    const release = Math.min(0.18, duration * 0.3);

    env.gain.setValueAtTime(0.0001, startTime);
    env.gain.exponentialRampToValueAtTime(peakGain, startTime + attack);
    env.gain.setValueAtTime(peakGain * 0.85, Math.max(startTime + attack, startTime + duration - release));
    env.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(env);
    osc2.connect(osc2Gain);
    osc2Gain.connect(env);
    env.connect(destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.04);
    osc2.stop(startTime + duration + 0.04);

    this.activeNodes.push(osc1, osc2, osc2Gain, env);
  }
}

export const hymnAudio = new HymnAudioEngine();
