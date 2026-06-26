import * as Tone from 'tone';

interface AudioGeneratorOptions {
  frequency: number;      // Hz
  duration: number;       // segundos
  waveform?: 'sine' | 'square' | 'triangle' | 'sawtooth';
  volume?: number;        // -Infinity a 0 dB
  fadeIn?: number;        // segundos
  fadeOut?: number;       // segundos
}

export class AudioGenerator {
  private synth: Tone.Synth | null = null;
  private synth1: Tone.Synth | null = null;
  private synth2: Tone.Synth | null = null;
  private pannerLeft: Tone.Panner | null = null;
  private pannerRight: Tone.Panner | null = null;
  private isPlaying = false;

  async initialize() {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
  }

  /**
   * Gera e reproduz uma frequência pura
   */
  async playFrequency(options: AudioGeneratorOptions) {
    const {
      frequency,
      duration,
      waveform = 'sine',
      volume = -12,
      fadeIn = 0.5,
      fadeOut = 0.5
    } = options;

    try {
      await this.initialize();
      this.stop();

      // Criar sintetizador se não existir
      if (!this.synth) {
        this.synth = new Tone.Synth({
          oscillator: { type: waveform },
          envelope: {
            attack: fadeIn,
            decay: 0.1,
            sustain: 0.9,
            release: fadeOut
          }
        }).toDestination();
      }

      // Configurar volume
      this.synth.volume.value = volume;

      this.isPlaying = true;

      // Reproduzir frequência
      const now = Tone.now();
      this.synth.frequency.setValueAtTime(frequency, now);
      this.synth.triggerAttack(frequency, now);
      
      // Agenda liberação automática se a duração for finita
      if (duration > 0) {
        this.synth.triggerRelease(now + duration);
        setTimeout(() => {
          this.isPlaying = false;
        }, duration * 1000);
      }
    } catch (error) {
      console.error('Erro ao gerar áudio:', error);
      this.isPlaying = false;
    }
  }

  /**
   * Gera áudio com binaural beats (dois tons diferentes panned left/right)
   * Ideal para estados alterados de consciência
   */
  async playBinauralBeats(
    baseFrequency: number,
    beatFrequency: number,
    duration: number
  ) {
    try {
      await this.initialize();
      this.stop();

      this.pannerLeft = new Tone.Panner(-1).toDestination();
      this.pannerRight = new Tone.Panner(1).toDestination();

      this.synth1 = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.5, release: 0.5 }
      }).connect(this.pannerLeft);

      this.synth2 = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.5, release: 0.5 }
      }).connect(this.pannerRight);

      this.synth1.volume.value = -12;
      this.synth2.volume.value = -12;

      const now = Tone.now();

      // Ouvido esquerdo
      this.synth1.frequency.setValueAtTime(baseFrequency, now);
      this.synth1.triggerAttack(baseFrequency, now);

      // Ouvido direito (base + beat)
      const targetFrequency = baseFrequency + beatFrequency;
      this.synth2.frequency.setValueAtTime(targetFrequency, now);
      this.synth2.triggerAttack(targetFrequency, now);

      this.isPlaying = true;

      if (duration > 0) {
        this.synth1.triggerRelease(now + duration);
        this.synth2.triggerRelease(now + duration);
        setTimeout(() => {
          this.isPlaying = false;
          this.pannerLeft?.dispose();
          this.pannerRight?.dispose();
        }, duration * 1000);
      }
    } catch (error) {
      console.error('Erro ao gerar binaural beats:', error);
      this.isPlaying = false;
    }
  }

  stop() {
    if (this.synth) {
      this.synth.triggerRelease();
    }
    if (this.synth1) {
      this.synth1.triggerRelease();
    }
    if (this.synth2) {
      this.synth2.triggerRelease();
    }
    this.isPlaying = false;
  }

  dispose() {
    this.stop();
    if (this.synth) {
      this.synth.dispose();
      this.synth = null;
    }
    if (this.synth1) {
      this.synth1.dispose();
      this.synth1 = null;
    }
    if (this.synth2) {
      this.synth2.dispose();
      this.synth2 = null;
    }
    if (this.pannerLeft) {
      this.pannerLeft.dispose();
      this.pannerLeft = null;
    }
    if (this.pannerRight) {
      this.pannerRight.dispose();
      this.pannerRight = null;
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

// Singleton
export const audioGenerator = new AudioGenerator();
