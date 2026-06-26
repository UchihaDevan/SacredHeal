import Dexie, { type Table } from 'dexie';

interface CachedAudio {
  id: string;
  frequency: number;
  duration: number;
  waveform: string;
  audioData: ArrayBuffer;  // WAV binário
  createdAt: number;
  expiresAt: number;
}

class AudioDatabase extends Dexie {
  audioCache!: Table<CachedAudio>;

  constructor() {
    super('SacredHealAudioDB');
    // @ts-ignore
    this.version(1).stores({
      audioCache: 'id, frequency, createdAt, expiresAt'
    });
  }
}

const db = new AudioDatabase();

/**
 * Gerencia cache de áudio em IndexedDB
 * Permite reprodução offline e carregamento mais rápido
 */
export class AudioCacheManager {
  private static readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias

  /**
   * Busca áudio em cache
   */
  static async getAudio(
    frequency: number,
    duration: number
  ): Promise<ArrayBuffer | null> {
    try {
      const cached = await db.audioCache
        .where('frequency')
        .equals(frequency)
        .and((audio: CachedAudio) => audio.duration === duration)
        .first();

      if (cached && cached.expiresAt > Date.now()) {
        console.log(`✅ Áudio em cache: ${frequency}Hz`);
        return cached.audioData;
      }

      // Expirou, deletar
      if (cached) {
        await db.audioCache.delete(cached.id);
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar áudio em cache:', error);
      return null;
    }
  }

  /**
   * Salva áudio em cache
   */
  static async saveAudio(
    frequency: number,
    duration: number,
    waveform: string,
    audioData: ArrayBuffer
  ): Promise<void> {
    try {
      await db.audioCache.put({
        id: `${frequency}-${duration}-${waveform}`,
        frequency,
        duration,
        waveform,
        audioData,
        createdAt: Date.now(),
        expiresAt: Date.now() + this.CACHE_DURATION
      });

      console.log(`💾 Áudio salvo em cache: ${frequency}Hz`);
    } catch (error) {
      console.error('Erro ao salvar áudio em cache:', error);
    }
  }

  /**
   * Limpa cache expirado
   */
  static async cleanExpired(): Promise<void> {
    try {
      const now = Date.now();
      await db.audioCache
        .where('expiresAt')
        .below(now)
        .delete();

      console.log('🧹 Cache limpo');
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }

  /**
   * Calcula tamanho do cache
   */
  static async getCacheSize(): Promise<number> {
    const audios = await db.audioCache.toArray();
    return audios.reduce((total: number, audio: CachedAudio) => total + audio.audioData.byteLength, 0);
  }
}
