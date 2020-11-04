const { override, useEslintRc, addWebpackAlias } = require("customize-cra");
const { resolve } = require('path');

const customizer = () => config => {
  config.node.__dirname = true;
  
  config.module.rules.splice(2, 0, {
    test: /\.svg(\?raw)$/,
    loader: 'raw-loader'
  });

  return config;
}

module.exports = override(
  useEslintRc(resolve(__dirname, '.eslintrc')),
  addWebpackAlias({
    '@': resolve(__dirname, '../'),
    '@nav': resolve(__dirname, '../assets/icons/nav'),
    '@info': resolve(__dirname, '../assets/icons/info'),
    '@ui': resolve(__dirname, '../assets/icons/ui'),
    '@themes': resolve(__dirname, '../assets/icons/themes'),
    '@controls': resolve(__dirname, '../assets/icons/controls'),
    '@settings': resolve(__dirname, '../assets/icons/settings'),
    '@modules': resolve(__dirname, '../modules')
  }),
  customizer()
)