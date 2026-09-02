// Web Audio API Synthesizer for Cartier-Inspired Luxury Auditory Ambience

class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;
  private oscillators: OscillatorNode[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle Ambient Score (Haute Horlogerie meditative soundscape)
  public toggleAmbient(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public toggle(): boolean {
    return this.toggleAmbient();
  }

  public playWarp() {
    this.playClick();
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  private startAmbient() {
    if (!this.ctx) return;
    this.stopAmbient();

    // Master ambient gain with smooth fade in
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.065, this.ctx.currentTime + 3.0);
    this.ambientGain.connect(this.ctx.destination);

    // Warm chord: D2 (73.42Hz), A2 (110Hz), F#3 (185Hz), C#4 (277.18Hz)
    const freqs = [73.42, 110.0, 185.0, 277.18];
    this.oscillators = freqs.map((freq) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      // Lowpass filter for velvety warmth
      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx!.currentTime);

      osc.connect(filter);
      filter.connect(this.ambientGain!);
      osc.start();
      return osc;
    });

    this.isAmbientPlaying = true;
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.oscillators = [];
        this.ambientGain?.disconnect();
        this.ambientGain = null;
      }, 1600);
    }
    this.isAmbientPlaying = false;
  }

  // Micro-tactile click (Mechanical timepiece precision)
  public playClick() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  // Crystalline chime for opening Hotspots & Dossiers
  public playChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [587.33, 880.0, 1174.66]; // D5, A5, D6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0.04, this.ctx!.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.04 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.04);
        osc.stop(this.ctx!.currentTime + idx * 0.04 + 0.85);
      });
    } catch {}
  }

  // Silk thread string pluck
  public playThreadPluck(index: number = 0) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const scale = [220.0, 246.94, 277.18, 329.63, 369.99, 440.0, 493.88];
      const freq = scale[index % scale.length];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch {}
  }
}

export const soundManager = new SoundManager();
