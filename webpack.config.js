const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:['babel-polyfill','./src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    // devServer: {
    //     port: 8080,
    //     contentBase: path.join(__dirname, 'dist')
    // },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
        

     ],
     devtool: 'eval-source-map',
    module: { 
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }
              ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/',
                        
                    }
                  },
                ],
            },

        ]
    }
};

