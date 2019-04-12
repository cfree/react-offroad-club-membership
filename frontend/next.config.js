const { parsed: localEnv } = require('dotenv').config({
  path: 'variables.env',
});

module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    env: localEnv,
  },
};