const express = require('express');
const cors = require('cors');
const action = require('./data/helpers/actionModel');
const project = require('./data/helpers/projectModel');

const server = express();
const port = 8000;

server.use(express.json(), cors());

server.get('/api/projects', (req, res) => {
  project
    .get()
    .then(response => {
      if (response) res.json(response);
    })
    .catch(err => {
      res.status(500).json({ error: 'Projects could not be retrieved.' });
    });
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  project
    .get(id)
    .then(response => {
      if (response) res.json(response);
    })
    .catch(err => {
      res.status(500).json({ error: 'Project could not be retrieved.' });
    });
});

server.listen(port, () => console.log(`\nAPI running on ${port}\n`));
