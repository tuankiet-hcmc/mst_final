const crypto = require('crypto')
  .randomBytes(256)
  .toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
  //uri: 'mongodb://localhost/mst_final',
  uri: 'mongodb://hao1:123456@ds147304.mlab.com:47304/mst_final', // Databse URI and database name
  secret: crypto, // Cryto-created secret
  db: 'mst_final'
};
