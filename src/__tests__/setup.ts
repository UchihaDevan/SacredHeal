import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Mock Howler
class MockHowl {
  play = vi.fn();
  pause = vi.fn();
  stop = vi.fn();
  playing = vi.fn(() => false);
  seek = vi.fn(() => 0);
  volume = vi.fn();
  unload = vi.fn();
  duration = vi.fn(() => 300);
  on = vi.fn();
  off = vi.fn();
}

vi.mock('howler', () => ({
  Howl: MockHowl
}));

// Mock Tone.js
class MockSynth {
  toDestination = vi.fn().mockReturnThis();
  connect = vi.fn().mockReturnThis();
  triggerAttack = vi.fn();
  triggerAttackRelease = vi.fn();
  triggerRelease = vi.fn();
  dispose = vi.fn();
  frequency = { setValueAtTime: vi.fn() };
  volume = { value: 0 };
}

class MockPanner {
  toDestination = vi.fn().mockReturnThis();
  dispose = vi.fn();
}

vi.mock('tone', () => ({
  start: vi.fn(),
  Synth: MockSynth,
  Panner: MockPanner,
  context: { state: 'suspended' },
  now: vi.fn(() => 0)
}));
