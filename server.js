const express = require('express');
const webpack = require('webpack');
const app = express();
const path = require('path');
require('dotenv').config();

if (process.env.NODE_ENV === 'development') {
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('./webpack.dev.js');
	const compiler = webpack(webpackConfig);
	app.use(
		webpackDevMiddleware(compiler, {
			hot: true,
			publicPath: webpackConfig.output.publicPath
		})
	);
	app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.join(__dirname, '/')));
    
    app.get('/api', (req, res, next) => {
		console.log('Should server mock data');
		res.send('End Request....');
    });
    
	app.use('*', function(req, res, next) {
		let filename = path.join(compiler.outputPath, 'index.html');
		compiler.outputFileSystem.readFile(filename, function(err, result) {
			if (err) {
				return next(err);
			}
			res.set('content-type', 'text/html');
			res.send(result);
			res.end();
		});
	});
} else if (process.env.NODE_ENV === 'production') {
	// Configuration for production environment
	app.use(express.static(path.join(__dirname, 'dist')));
	app.get('*', function response(req, res) {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}

const server = app.listen(8080, function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
