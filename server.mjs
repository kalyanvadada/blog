import express from 'express';

import pkg from './routes/index.js';

const {router} = pkg;
const app = express();
const PORT = 3000;
app.use(express.static('public'));
app.use(express.json());

app.use('/blogs', (req, res, next) => {
    // setting the response headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // cache control header
    // next middleware or route handler
    next();
},router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
