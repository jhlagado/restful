const express = require('express');

const getRoutes = (database, listUrl, itemUrl) => {
  const router = express.Router();
  router.route(listUrl)

    .post((req, res) => {
      database.create(req.body)
        .catch(err => res.send(err))
        .then(item => res.status(201).json(item));
    })

    .get((req, res) => {
      database.find(req.query)
        .catch(err => res.send(err))
        .then(list => res.json(list));
    });

  router.route(itemUrl)

    .all((req, res, next) => {
      const { id } = req.params;
      database.findById(id)
        .catch(err => res.send(err))
        .then(item => req.item = item)
        .finally(() => next());
    })

    .get((req, res) => res.json(req.item))

    .put((req, res) => {
      const object = {
        ...req.body,
        id: req.item.id,
      };
      database.update(object)
        .catch(err => res.send(err))
        .then(item => res.json(item));
    })

    .delete((req, res) =>
      database.delete(req.item)
        .catch(err => res.send(err))
        .then(() => res.send('Item deleted')));

  return router;
};

module.exports = { getRoutes };
