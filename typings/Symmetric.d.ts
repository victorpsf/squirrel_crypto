import ciphers from './types/symmetric_cipher'
import hashCiphers from './types/hash_cipher'
import Encoding from './types/encoding_save'

declare namespace Symmetric {
  interface SymmetricOptions {
    // default aes-256-cbc
    algorithm?: ciphers,
    passphrase: string,
    // default false
    hash?: boolean,
    // default sha512
    hashAlgorithm: hashCiphers,
    iv: string | Buffer,
    // default hex
    ivEncoding?: Encoding 
  }
}

declare class Symmetric {
  constructor(args: Symmetric.SymmetricOptions)

  setAlgorithm(algorithm: ciphers): void;
  setPassphrase(passphrase: string, hash: boolean, hashAlgorithm: hashCiphers): void;
  setIv(iv: Buffer | string, ivEncoding: Encoding): void;
  getIv(): Buffer;
  setRandomIv(): void;

  // default format 'hex'
  encrypt(value: string, format: Encoding): string;
  // default format 'hex'
  decrypt(value: string, format: Encoding): string;
}

export = Symmetric