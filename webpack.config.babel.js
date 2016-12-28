import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

// output configuration
const OUTPUT_FILENAME = path.basename(__dirname)
const OUTPUT_DIRECTORY = 'public'

const webpackConfig = {
	entry: {
		[path.join('js', OUTPUT_FILENAME)]: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, OUTPUT_DIRECTORY),
		filename: '[name].min.js',
		publicPath: path.join('/', OUTPUT_DIRECTORY)
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract({
				fallbackLoader: 'style-loader', 
				loader: 'css-loader?modules&camelCase&localIdentName=[name]--[local]___[hash:base64:5]'
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin(path.join('css', `${OUTPUT_FILENAME}.min.css`)),
		new webpack.optimize.OccurrenceOrderPlugin()
	],
	externals: ['React', 'ReactDOM']
}

if (process.argv.indexOf('-p') < 0) {
	webpackConfig.devtool = '#cheap-module-eval-source-map'
	webpackConfig.plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('development')
		},
		__DEV__: true
	}))
} else {
	webpackConfig.plugins.push(new webpack.DefinePlugin({
		__DEV__: false
	}))
}

export default webpackConfig

