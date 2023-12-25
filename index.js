const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const route = require('./routes/route');
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Connection URI for MongoDB, replace 'your_database_uri' and 'your_database_name' with your actual values

function ConnecttoDb() {
const uri = 'mongodb://127.0.0.1:27017/your_database_name';

mongoose.connect(uri).then(() => console.log('you are connected to the databse'));
}

app.listen(8000, () => {
    ConnecttoDb();
    console.log('Server is running on port 8000');
});
app.use(route);
