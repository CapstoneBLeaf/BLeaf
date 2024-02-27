
const express = require('express');
const app = express();
const PORT = 8080;

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json()); 

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const { COOKIE_SECRET } = require('./secrets');
const cookieParser = require('cookie-parser');
app.use(cookieParser(COOKIE_SECRET));


const cors = require('cors');
app.use(cors());

const client = require('./db/client');
client.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    if (err.message == `duplicate key value violates unique constraint "users_username_key"`) {
        res.status(400).send({ error: 'Username already exists!'})
    }
  })