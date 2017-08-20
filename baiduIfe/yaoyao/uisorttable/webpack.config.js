let webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: {
        app:'./app.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'uisort',
            template:'./src/index.html'
        })
    ],
    devServer:{
        contentBase:'./dist'
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/, exclude:/node_modules/, loader:'babel-loader'
            },

            {
                test:/\.less$/, loader:['style-loader', 'css-loader', 'less-loader']
            }        ]
    }

}