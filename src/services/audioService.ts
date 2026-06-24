let audioCtx: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

export const playPureTone = (hz: number, volume: number = 0.5) => {
  try {
    if (oscillator) {
      stopPureTone();
    }

    // Inicializa o contexto de áudio se ainda não existir
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    oscillator.type = 'sine'; // Onda senoidal pura para frequências solfeggio
    oscillator.frequency.value = hz;

    // Suaviza a entrada de volume para evitar estalos sonoros (clique)
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.4, audioCtx.currentTime + 0.2); // Fator de segurança de volume

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
  } catch (error) {
    console.error('Falha ao sintetizar frequência de áudio:', error);
  }
};

export const stopPureTone = () => {
  if (oscillator && audioCtx) {
    try {
      const currentCtx = audioCtx;
      const currentGain = gainNode;
      const currentOsc = oscillator;

      // Suaviza a saída de volume
      currentGain?.gain.setValueAtTime(currentGain.gain.value, currentCtx.currentTime);
      currentGain?.gain.exponentialRampToValueAtTime(0.0001, currentCtx.currentTime + 0.15);

      setTimeout(() => {
        try {
          currentOsc?.stop();
          currentOsc?.disconnect();
          currentGain?.disconnect();
        } catch (e) {
          // Ignora erros decorrentes de parada tardia
        }
      }, 160);
    } catch (e) {
      console.error('Erro ao parar tom puro:', e);
    }

    oscillator = null;
    gainNode = null;
  }
};
