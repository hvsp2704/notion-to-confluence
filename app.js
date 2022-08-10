const cors = require('cors');
const express = require('express');
const app =  express();
require('dotenv').config();
const PORT = process.env.PORT||3005;
app.use(cors());
app.use(express.json());

app.use('/notion',(require('./routes/notion')));
app.use('/database',(require('./routes/database')));
// app.use('/confluence',(require('./routes/confluence')))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
