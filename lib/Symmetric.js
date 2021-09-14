const Hash = require('./Hash')
const Crypto = require('crypto')

module.exports = class Symmetric {

  constructor(args = { }) {
    this.crypto = Crypto
    let { algorithm = 'aes-256-cbc', passphrase, hash, hashAlgorithm, iv, ivEncoding = 'hex' } = args

    this.setAlgorithm(algorithm)
    if (passphrase) this.setPassphrase(passphrase, hash, hashAlgorithm)
    if (iv) this.setIv(iv, ivEncoding)
  }

  setAlgorithm(algorithm) {
    this.algorithm = algorithm
  }

  setPassphrase(passphrase, hash = false, hashAlgorithm) {
    if (hash) {
      let _hash = new Hash({ algorithm: hashAlgorithm })
      passphrase = _hash.update(passphrase)
    }

    this.passphrase = passphrase
  }

  setIv(iv, ivEncoding) {
    if (Buffer.isBuffer(iv)) {
      this.iv = iv
      return
    }

    this.iv = Buffer.from(iv, ivEncoding)
  }

  getIv () {
    return this.iv
  }

  setRandomIv () {
    const { ivLength } = this.infoAlgorithm()

    this.iv = this.crypto.randomBytes(ivLength)
  }

  infoAlgorithm() {
    return this.crypto.getCipherInfo(this.algorithm)
  }

  getScrypt() {
    let { keyLength, blockSize } = this.infoAlgorithm()

    const args = [
      this.passphrase, 'salt', keyLength
    ]

    if (blockSize) {
      args.push({ blockSize: blockSize })
    }

    try {
      return this.crypto.scryptSync.apply(null, args)
    }

    // é possivel que o parametro de blockSize não funcione em alguns scripts
    // então vamos remover
    catch(error) {
      if (error.code != 'ERR_CRYPTO_INVALID_SCRYPT_PARAMS')
        throw error;

      args.pop()
      return this.crypto.scryptSync.apply(null, args)
    }
  }

  getCipher() {
    return this.crypto.createCipheriv(
      this.algorithm,
      this.getScrypt(),
      this.iv
    )
  }

  getDecipher() {
    return this.crypto.createDecipheriv(
      this.algorithm,
      this.getScrypt(),
      this.iv
    )
  }

  concatBuffer(...args) {
    return Buffer.concat(args)
  }

  encrypt(value, format = 'hex') {
    let cipher = this.getCipher()

    value = this.concatBuffer(cipher.update(Buffer.from(value)), cipher.final())
    return value.toString(format)
  }

  decrypt(value, format = 'hex') {
    let decipher = this.getDecipher()

    value = this.concatBuffer(decipher.update(Buffer.from(value, format)), decipher.final())
    return value.toString('utf-8')
  }
}