const { parsed: localEnv } = require('dotenv').config({
  path: 'variables.env',
});

module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    env: localEnv,
  },
  webpack: (config, { dev }) => {
    // config.module.rules.push({ test: /\.(s?)css$/, loader: ['style-loader', 'css-loader', 'sass-loader'] });
    // config.module.rules.push({ test: /\.(s)?css$/, loader: ['style-loader', 'css-loader'] });
    return config;
  }
};
