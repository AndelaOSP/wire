const express = require('express');
const webpack = require('webpack');
const app = express();
const bodyParser = require('body-parser');
const mockMiddleware = require('./mock_endpoints/mockMiddleware');
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
  app.use(bodyParser.json());

  // Incident routes
  app.get('/api/incidents', mockMiddleware.fetchIncidents);
  app.get('/api/incidents/:id', mockMiddleware.fetchIncident);
  app.put('/api/incidents/:id', mockMiddleware.updateIncident);
  app.get('/api/search/incidents', mockMiddleware.handleSearch);

  // Notes routes
  app.post('/api/incidents/:id/notes', mockMiddleware.addNoteToIncident);
  app.get('/api/incidents/:id/notes', mockMiddleware.fetchIncidentNotes);
  app.put('/api/notes/:id', mockMiddleware.editIncidentNote);
  app.delete('/api/notes/:id', mockMiddleware.archiveIncidentNote);

  // Chat routes
  app.post('/api/incidents/:id/chats', mockMiddleware.addChatToIncident);
  app.get('/api/incidents/:id/chats', mockMiddleware.fetchIncidentChats);
  app.put('/api/chats/:id', mockMiddleware.editIncidentChat);
  app.delete('/api/chats/:id', mockMiddleware.archiveIncidentChat);

  // Staff route
  app.get('/api/users', mockMiddleware.fetchStaff);

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
} else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  // Configuration for production environment
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

const server = app.listen(process.env.PORT || 8080, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
