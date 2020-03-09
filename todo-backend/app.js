const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', "DELETE, POST, PUT, GET, OPTIONS");
  next();
})

const taskRoutes = require('./routes/task');

app.use('/tasks', taskRoutes);


app.listen(7000);
