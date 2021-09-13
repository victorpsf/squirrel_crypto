import HashCipher from '../types/hash_cipher'
import encoding from '../types/encoding_save'

declare namespace Hash {
  interface HashOptions {
    // default sha512
    algorithm: HashCipher,
    // default hex
    encoding: encoding
  }
}

declare class Hash {
  constructor(args?: Hash.HashOptions)

  update(value: string): string
  static update(value: string): string
}

export = Hash