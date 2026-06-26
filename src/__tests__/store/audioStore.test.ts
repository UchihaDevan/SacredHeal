import { describe, it, expect, beforeEach } from 'vitest';
import { useAudioStore } from '../../store/audioStore';

describe('audioStore', () => {
  beforeEach(() => {
    useAudioStore.setState({
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      playlist: [],
      playlistIndex: -1
    });
  });

  it('should play a track', async () => {
    const { play } = useAudioStore.getState();
    
    await play({
      id: '1',
      name: 'Test Track',
      url: 'test.mp3',
      duration: 300,
      imageUrl: 'test.jpg',
      category: 'Test'
    });

    const state = useAudioStore.getState();
    expect(state.currentTrack?.id).toBe('1');
    expect(state.isPlaying).toBe(true);
  });

  it('should pause playback', () => {
    const { pause } = useAudioStore.getState();
    pause();

    const state = useAudioStore.getState();
    expect(state.isPlaying).toBe(false);
  });

  it('should navigate to next track', () => {
    const tracks = [
      { id: '1', name: 'Track 1', duration: 300, imageUrl: '', category: '' },
      { id: '2', name: 'Track 2', duration: 300, imageUrl: '', category: '' }
    ];

    useAudioStore.setState({
      playlist: tracks,
      playlistIndex: 0
    });

    const { nextTrack } = useAudioStore.getState();
    nextTrack();

    const state = useAudioStore.getState();
    expect(state.playlistIndex).toBe(1);
  });
});
