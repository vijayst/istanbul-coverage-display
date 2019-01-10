const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: './index.html',
    filename: './index.html'
});

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', { modules: false }], 'react'],
                        plugins: [
                            'istanbul'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [htmlWebpackPlugin]
};
