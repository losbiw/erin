/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
        test: /\.png$/,
        use: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      DEBUG_PROD: false,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
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
      '@': path.resolve(__dirname, 'src/components'),
      '@icons': path.resolve(__dirname, 'src/assets/Icons'),
      '@nav': path.resolve(__dirname, 'src/assets/nav'),
      '@info': path.resolve(__dirname, 'src/assets/info'),
      '@ui': path.resolve(__dirname, 'src/assets/ui'),
      '@themes': path.resolve(__dirname, 'src/assets/themes'),
      '@controls': path.resolve(__dirname, 'src/assets/controls'),
      '@settings': path.resolve(__dirname, 'src/assets/settings'),
      '@logo': path.resolve(__dirname, 'src/assets/app'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@slices': path.resolve(__dirname, 'src/slices'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@redux': path.resolve(__dirname, 'src/redux'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
};
