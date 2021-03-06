const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(bodyParser.json({extended: true}));
app.use(cors());

// 라우터
const api = require('./api');
app.use('/api',api );

app.listen(4000, () => {
  console.log('dashboard server listening port on 4000');
});
