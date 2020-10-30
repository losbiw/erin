module.exports = function override(config, _env) { 
  config.module.rules[1].use[0].options.useEslintrc = true;
  config.node.__dirname = true;
  
  config.module.rules.unshift({
    test: /\.svg(\?raw)$/,
    loader: 'raw-loader'
  });

  return config;
}