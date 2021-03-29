const express = require('express');

const routes = require('./routes');
const { PORT } = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors')

const app = express();

require('./config/mongoose');
require('./config/express')(app);

app.use(cors({
    exposedHeaders:'Authorization'
}));
app.get('/', (req, res) => {
    res.json({ message: 'It\'s working!'});
});

app.use('/api', routes);
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));