import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  hz?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, hz = 432 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;

    const render = () => {
      // Ajustar o canvas ao tamanho do elemento pai
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Desenhar 3 ondas senoidais com fases, amplitudes e cores diferentes
      const waves = [
        {
          amplitude: isPlaying ? 12 : 1.5,
          frequency: (hz / 1000) * 0.05 + 0.02,
          speed: 0.08,
          color: 'rgba(199, 167, 92, 0.4)' // Dourado
        },
        {
          amplitude: isPlaying ? 8 : 1,
          frequency: (hz / 1000) * 0.03 + 0.015,
          speed: -0.05,
          color: 'rgba(124, 58, 237, 0.25)' // Roxo
        },
        {
          amplitude: isPlaying ? 16 : 2,
          frequency: (hz / 1000) * 0.07 + 0.025,
          speed: 0.12,
          color: 'rgba(199, 167, 92, 0.15)' // Dourado claro translúcido
        }
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;

        for (let x = 0; x < width; x++) {
          // Fórmula da onda senoidal: y = centerY + amplitude * sin(x * freq + offset * velocidade)
          const y = centerY + wave.amplitude * Math.sin(x * wave.frequency + offset * wave.speed);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Se estiver tocando, desloca a onda. Se parado, flutua muito lentamente
      offset += isPlaying ? 0.35 : 0.05;

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, hz]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-12 rounded-lg opacity-85"
      title={isPlaying ? `Sintonizando frequência de ${hz} Hz` : 'Áudio pausado'}
    />
  );
};
