require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/profile/:id', (req, res) => {
      const actualPage = '/profile';
      const queryParams = { user: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/events/:type', (req, res) => {
      const actualPage = '/events';
      const queryParams = { type: req.params.type };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/event/:id', (req, res) => {
      const actualPage = '/event';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/settings/:setting', (req, res) => {
      const actualPage = '/settings';
      const queryParams = { settings: req.params.setting };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) { throw err; }
      console.log(`'> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
