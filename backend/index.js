const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const PORT = process.env.PORT || 4000;
sequelize.sync({ alter: true }).then(()=> {
  app.listen(PORT, ()=> console.log('Server started on', PORT));
}).catch(err => {
  console.error('DB connection failed:', err);
});
