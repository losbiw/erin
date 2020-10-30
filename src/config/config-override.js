const { override, useEslintRc } = require("customize-cra");
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
  customizer()
)

