process.env.NODE_ENV = 'test'
module.exports = {
  extension: 'ts',
  watchExtensions: 'ts',
  spec: './test/**/*.test.ts',
  require: 'ts-node/register',
}
