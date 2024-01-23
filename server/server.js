const express = require('express');
const cors  = require('cors');
const db = require('./src//models/index');
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost' 
}));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`) );