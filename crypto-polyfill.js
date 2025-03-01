// crypto-polyfill.js
// This file provides a polyfill for crypto.getRandomValues in environments where it's not available

// Import crypto module for Node.js
import crypto from 'crypto';

// Check if crypto.getRandomValues is not available
if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.getRandomValues !== 'function') {
  console.log('Polyfilling crypto.getRandomValues for build environment');

  // Create a crypto object if it doesn't exist
  if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = {};
  }

  // Implement getRandomValues using Node.js crypto module
  globalThis.crypto.getRandomValues = function(array) {
    if (!(array instanceof Uint8Array || array instanceof Uint16Array || array instanceof Uint32Array)) {
      throw new TypeError('Expected a TypedArray');
    }

    const bytes = crypto.randomBytes(array.length * array.BYTES_PER_ELEMENT);
    array.set(new Uint8Array(bytes.buffer, 0, array.length * array.BYTES_PER_ELEMENT));

    return array;
  };
}

export default globalThis.crypto;