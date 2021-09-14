# squirrel_crypto
Simples modulo para trabalho com criptografia utilizando nodejs com biblioteca nativa

# criptografia symmetrica

``` js
const { Asymmetric, Symmetric, Hash } = require('squirrel_crypto')

const symmetric = new Symmetric({
  // informa que deseja que o modulo use hash na senha
  hash: true,
  // informa o algoritmo de hase a ser utilizado
  hashAlgorithm: 'RSA-SHA512',
  // informa o algoritmo de criptografia a ser utilizado
  algorithm: 'aes-256-cbc-hmac-sha256',
  // informa a senha
  passphrase: 'password@teste'
})

// caso não possua um vetor de inicialização
// pode gerar pelo modulo.
// obs: vai ser feito a leitura da configuração do script para obter o tamanho correto.
symmetric.setRandomIv()
const iv = symmetric.getIv()

// encriptando
// o 'base64' é o tipo de saida
const encrypted = symmetric.encrypt('teste', 'base64')
// o 'base64' é o formato de saida da criptografia
// é importante colocar o mesmo formato que foi utilizado na criptografia
const decrypted = symmetric.decrypt(encrypted, 'base64')

console.log(encrypted, decrypted)
// output >> '8eVytOV2/eq6p8VV9hs1wg==' 'teste'
```

# criptografia assymetrica

``` js
const { Asymmetric, Symmetric, Hash } = require('squirrel_crypto')

const asymmetric = new Asymmetric({
  // algoritmo a ser utilizado
  algorithm: 'camellia-256-cbc',
  // informa se deseja utilizar o hash na senha fornecida
  hash: true,
  // algoritmo hash
  // vai também ser adicionado ao rsa
  hashAlgorithm: 'ssl3-sha1',
  // tamanho da chave
  keyLength: '2048',
  // senha a ser utilizada
  passphrase: 'password@teste',
  // padding da chave
  rsaPadding: 'RSA_PKCS1_OAEP_PADDING'
});

// obtendo a chave publica e privada
const { publicKey, privateKey } = asymmetric.getKeysPair();

console.log(publicKey, privateKey)
// output >>
/** 
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAuHMwQovWpsWhGnUDbaTdaM2ttzLIuOOiuscNjfyWoYuV8PjaCHJK
j5K8/UeRrYKLkTdBsOsKKhL8Tb3lg4nvwAPgtDDUfZXloSeFTLokr7/xBFqhFmcA
hFD260HpCKl7r940aMIC+HCHvtxmusE8vKuCmM5d2wXbquu0vibdMUC17HdSJrYD
j2DbnsJ50rWMcdXLOcoBbnFEI6KC5Xwgobte2QHfF+GgVheuCQX/boQ4NykFb6RH
ylN02jNchh9JGKxEQEJG/G32b3tDHr7dgbJdgoqmq0BmM4YLFSmRkMDuI7owaHUz
4O6ZzPIq/nFr9GcWVkUG236EILiRE3GX0QIDAQAB
-----END RSA PUBLIC KEY-----
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLzBZBgkqhkiG9w0BBQ0wTDApBgkqhkiG9w0BBQwwHAQIB7xiRJSS+ukCAggA
MAwGCCqGSIb3DQIJBQAwHwYLKoMIjJpLPQEBAQQEEPy4DOfFuqEMi5lV8sge99oE
ggTQWklw9UtoyH96fMsX9vsnx8ZFZ+cIoLrju5sCghEU1mLXHdSAg9RLguBwUuIL
cULaIP2WSv19ohIlAHf/0XZxBG8Y5H0m/uz8KwY7g7AdEcXbq+b5RI7x5J0BgNZh
z0FBERgcqOtwk3JrdOj+SJBdy625C/yoxkALZ1h13sUBpjFu+RgzIE3e2MWJIpyy
EgR/KhqE8aGzNY6S6I7X0qhkup8o0eMRvV84OdOFwSB+8FzJx8ZM65uVE76e3PsU
9cxbc0Rk59cu1WCKHhEL3KCo6iWP8NlURRDqR1rYql3NKAUThNsgG5qMD/lIJlH9
guwySk6FVJvPbI809AGoFEo2qO4K+NLWP+iKIWH8RurdatJF7wrWJNO787cRVhlW
lhFDZAB6YxgSr/d0bWZ3+/iA3ZBz7DXzNkU3pfKC16J+7ceMTe9MNOS2mNJbDguW
gVpqrRV9JuOql0IFkYAQVKLTbeU7QegG7FHwwb5urk9K9o2fIwms+dLmKaPoSCHw
RrX5j9ZUbDw+tor67MZZ9Nfm0005S5YOjZg8gR0x6t+/T0qLhx9ohytk4uNp8CWz
mhmROhLI3WUdsGIrmGZO1a80AhpzPCxHIyoS5D4n/ccHkfHRiqZ/5fjl12R1nXQ3
3OgAorhUbYye+S976qKXK1lEjV3dtThG5ESZcArmfD/xC6LSz5dagg9dpjIkYzzu
fVc+JysNWG5opnq0P5l/xjgKV8FOrbISyLEhu3nEl0zCL2Gp2MbCvdBtMrfxdMH/
PJRwCRtIEdN0IzCIQPYXlLW5nZ3vXAhrgnd7cnn9C/zMP/nnh0pZr4olbBKJK2AR
QyRrrA3zHYB4nOm0cJwPHqAiRkYPD9ywSlk5G4SADprtUG4UhrXA5i2JDjE6eQxO
4EwclewN/+euhIA+Y/esVHpbIMgzNIRsZxZozY/hyoubXXLObkxMfMv2Am6LGCTF
je6lrf+TmB1YqQBQYDSN00I6kfucmdIszlxvzhm/V6xjKlukgIbzBbhxF4MkpjgZ
QHyVVexCNymjXnpvTG1De+6q2d62H+9GjmWXxRIAE0aQSH0mekNUP+WCyPhhqJuA
GZNwK6w/V0Pk5M54hUypS8IEOJLMXNUFSqvVHlnBY3WIcMeUcrav2OM3kOSPKCSf
6OEIY1XLtWjP0Wz0McYHuj+3cSpbwGHP5HbdQvRVKKJIKFYhibIstlhxAQYD6mR4
/2sjBqZxXp6/Fn9GZNePHVEkE48fdIqyO4zfemeSG3BKy+xKnTNRMwLNmbf6bBcA
px/MWJNpLjy7Uup7aUoDEXr/BYzu2RvWdOTgvJKX4IV0QiM30qqg3azwNiZEKQmU
N3HQWV1DM0jWgpkFbxKZSIfvu6PHwRVSDKd3xXZzJIwaCIhjnizpnMsEyNRJPkt9
w3jWLQLcmIvdF/coHldqxLJjz9icIRH46Q/HYONcHTPGceoI+EuFSFXNH0GYymkO
7HlfV9tfJ7nCsm+r+lXKCFQuCeEizu+M+EHMq5HJH3v+rUcy4GEyDVwbhyhAHEQ0
k28ABofWEAu8Zzp8HlaeF/4GOPjf3E66bgrl77b2PAPXsgL+8/9oYM7CNum1eZQI
VZo1tlcluSWJpnlYDaq6JRa7+eBIo0Kv4wYrqB1bDo+UJQs=
-----END ENCRYPTED PRIVATE KEY-----
 */

// adiciona as chaves para serem utilizadas na criptografia
// obs: sempre informe uma senha a ser utilizada, o modolo requer uma senha para funcionar caso contrareo pode dar erro, tamém é uma recomendação na documentação oficial.
asymmetric.setPrivateKey(privateKey)
asymmetric.setPublicKey(publicKey)

// 'base64' é o formato de saida
const encrypted = asymmetric.publicEncrypt('teste', 'base64')
// 'base64' é o formato do valor de saida
const decrypted = asymmetric.privateDecrypt(encrypted, 'base64')

console.log(encrypted, decrypted)
// output >> qZbB1y90im4lD+7j80X/Y9hTfu6IttDGuMJXuplTKchAnsvs+GxceeLyuu74kxyYaPtQ10YiiE2KiXOab5DSNtydKDvOq5X7vz9p3IxxmGwnvntBAYpneOIZVfF10P8288XdaogWfI5iEamOT6INUWIuKr3himL3T26W72TS9+BeYJr/w/ksyciAmtm4N7En7SdMlgFX9R6O7ATh/whVCC7njT3PDYzy3rS2i78CtJEW+lNlAwXObCflc7TwnVmqa+GgqgE0ERkx2TenuqU0CAqc8C5RipgPkx1s0IpsmRc3vZ4iqZUKYLxQe9ldqun9t1SvykZmtb0FhOn+jcZ+2w== teste
```

# utilizando hash

``` js
const { Asymmetric, Symmetric, Hash } = require('squirrel_crypto')

const hash = new Hash({
  algorithm: 'ssl3-sha1',
  encoding: 'base64'
})

console.log(hash.update('teste valor'))
```