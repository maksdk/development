const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: { main: './src/index.js'},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	devtool: 'eval-source-map', 
	module:{
		rules: [
			{
				test: /\.js$/,
				exclude:/node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						]
					}
				}
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options:{
						// minimize: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test:/\.(jpe?g|png|gif|svg)$/,
				use: {
					loader:'url-loader',
					options:{
						limit: 1000, //kbt максимальный размер в килобайтех. если больше, то не будет переводит в Base64
						outputPath: 'img/', // говорим чтобы все изображение поместил в папку img, если они весят больше 1000 байт
						name:'[path][name].[ext]', // имя картинки
					}
				} 
			},
			{
        test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
    }
		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
}