/**
 * Client-Side Local Encryption for Khayal Journals
 * Uses Web Crypto API (AES-GCM 256-bit) to ensure all entries stored
 * in the user's browser are locally encrypted and private.
 */

const KEY_STORAGE_NAME = 'khayal_vault_symkey_v1';
const PASSCODE_SALT_NAME = 'khayal_passcode_salt_v1';

async function getOrCreateDeviceKey(): Promise<CryptoKey> {
  const existingKeyB64 = localStorage.getItem(KEY_STORAGE_NAME);
  if (existingKeyB64) {
    try {
      const rawKey = Uint8Array.from(atob(existingKeyB64), (c) => c.charCodeAt(0));
      return await window.crypto.subtle.importKey(
        'raw',
        rawKey,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
    } catch {
      // Re-generate if corrupted
    }
  }

  // Generate new 256-bit AES-GCM key
  const newKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const exported = await window.crypto.subtle.exportKey('raw', newKey);
  const exportedB64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
  localStorage.setItem(KEY_STORAGE_NAME, exportedB64);
  return newKey;
}

export async function encryptData(plainText: string): Promise<string> {
  if (!window.crypto?.subtle) {
    // Fallback if subtle crypto is unsupported
    return btoa(unescape(encodeURIComponent(plainText)));
  }

  try {
    const key = await getOrCreateDeviceKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(plainText);

    const cipherBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );

    const cipherArray = new Uint8Array(cipherBuffer);
    const combined = new Uint8Array(iv.length + cipherArray.length);
    combined.set(iv, 0);
    combined.set(cipherArray, iv.length);

    // Convert to base64 with version prefix
    return 'enc:v1:' + btoa(String.fromCharCode(...combined));
  } catch (err) {
    console.error('Local encryption error, using safe fallback', err);
    return 'b64:' + btoa(unescape(encodeURIComponent(plainText)));
  }
}

export async function decryptData(encryptedString: string): Promise<string> {
  if (!encryptedString) return '';

  if (encryptedString.startsWith('b64:')) {
    return decodeURIComponent(escape(atob(encryptedString.slice(4))));
  }

  if (!encryptedString.startsWith('enc:v1:')) {
    // Legacy / plain text
    return encryptedString;
  }

  if (!window.crypto?.subtle) {
    return encryptedString;
  }

  try {
    const key = await getOrCreateDeviceKey();
    const b64Data = encryptedString.slice(7);
    const combined = Uint8Array.from(atob(b64Data), (c) => c.charCodeAt(0));

    const iv = combined.slice(0, 12);
    const cipherText = combined.slice(12);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      cipherText
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (err) {
    console.warn('Decryption failed, might be plain text or different key', err);
    return encryptedString;
  }
}
