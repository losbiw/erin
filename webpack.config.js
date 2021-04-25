const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'electron-renderer',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/react-build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  node: {
    __dirname: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@nav': path.resolve(__dirname, 'src/assets/nav'),
      '@info': path.resolve(__dirname, 'src/assets/info'),
      '@ui': path.resolve(__dirname, 'src/assets/ui'),
      '@themes': path.resolve(__dirname, 'src/assets/themes'),
      '@controls': path.resolve(__dirname, 'src/assets/controls'),
      '@settings': path.resolve(__dirname, 'src/assets/settings'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
};
