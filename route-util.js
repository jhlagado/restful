const getListRoutes = (route, database) => {

  route

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
};

const getItemRoutes = (route, database) => {

  route

    .all((req, res, next) => {
      const { id } = req.params;
      database.findById(id)
        .then(item =>
          req.item = item)
        .catch(err =>
          req.err = err)
        .finally(() => next());
    })

    .get((req, res) => {
      if (req.err) {
        res.status(404).send(req.err.message);
      } else {
        res.json(req.item);
      }
    })

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
        .catch(err => res.status(404).send(err))
        .then(() => res.send('Item deleted')));
};

module.exports = {
  getListRoutes,
  getItemRoutes,
};
