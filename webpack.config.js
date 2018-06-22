const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: ['./src/app.scss','./src/app.js','./src/index.html'],
        vendor: ["jquery", "lodash", "vue"],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        
        loaders: [

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                }),
            },
            
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        
                        scss: ExtractTextPlugin.extract({
                            use: ['css-loader', 'sass-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        
                        
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env'],
                    plugins: ['transform-decorators-legacy'],
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[sha512:hash:base64:6]-[name].[ext]'
                }
            },
            {
                test: /\.(html)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ], // rules
        

    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name:"vendor", filename:"vendor.js"}),
        new ExtractTextPlugin('app.css'),
    ],
    
    
};


