import '@testing-library/jest-dom';
import { vi } from 'vitest';
vi.spyOn(console, 'error').mockImplementation(() => {});

// React Router v7 checks `signal instanceof AbortSignal` but jsdom and Node.js
// expose different AbortSignal classes (realm mismatch). Override Symbol.hasInstance
// so the check passes for any object that structurally looks like an AbortSignal.
if (typeof AbortSignal !== 'undefined') {
  Object.defineProperty(AbortSignal, Symbol.hasInstance, {
    value: (instance: unknown) =>
      instance != null &&
      typeof (instance as AbortSignal).aborted === 'boolean' &&
      typeof (instance as AbortSignal).addEventListener === 'function',
    configurable: true,
  });
}
