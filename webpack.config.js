const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin()
        ]
    },
    node: {
        __dirname: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@nav': path.resolve(__dirname, 'src/assets/icons/nav'),
            '@info': path.resolve(__dirname, 'src/assets/icons/info'),
            '@ui': path.resolve(__dirname, 'src/assets/icons/ui'),
            '@themes': path.resolve(__dirname, 'src/assets/icons/themes'),
            '@controls': path.resolve(__dirname, 'src/assets/icons/controls'),
            '@settings': path.resolve(__dirname, 'src/assets/icons/settings'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@interfaces': path.resolve(__dirname, 'src/interfaces')
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    }
}