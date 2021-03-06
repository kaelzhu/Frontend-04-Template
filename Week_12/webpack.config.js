const path = require('path')

module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                { pragma: 'createElement' },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        hot: true,
        index: 'main.html',
        publicPath: '/',
    },
    mode: 'development',
}
