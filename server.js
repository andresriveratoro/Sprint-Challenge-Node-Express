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
      res.json(response);
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
      res.json(response);
    })
    .catch(err => {
      res.status(500).json({ error: 'The project could not be retrieved.' });
    });
});

server.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  project
    .insert({ name, description })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: 'The project could not be added.' });
    });
});

server.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  project
    .update(id, { name, description, completed })
    .then(updated => {
      if (updated) project.get(id).then(response => res.json(response));
      else {
        res.status(404).json({
          message: 'The project with the specified ID does not exist.',
        });
      }
    })
    .catch(err =>
      res.status(500).json({ error: 'The project could not be updated.' })
    );
});

server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  project
    .remove(id)
    .then(deleted => {
      if (deleted) res.json({ message: 'Project deleted.' });
      else {
        res.status(404).json({
          message: 'The project with the specified ID does not exist.',
        });
      }
    })
    .catch(err =>
      res.status(500).json({ error: 'The project could not be deleted.' })
    );
});

server.get('/api/actions', (req, res) => {
  action
    .get()
    .then(response => res.json(response))
    .catch(err =>
      res.status(500).json({ error: 'Actions could not be retrieved.' })
    );
});

server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  action
    .get(id)
    .then(response => res.json(response))
    .catch(err =>
      res.status(500).json({ error: 'The action could not be retrieved.' })
    );
});

server.listen(port, () => console.log(`\nAPI running on ${port}\n`));
