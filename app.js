const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const nodeEnv = process.env.NODE_ENV;
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);

const { router } = require('./router');

app.use('/api', router);

app.listen(port, () => {
  console.log(`Running ${nodeEnv} server on port ${port}`);
});
