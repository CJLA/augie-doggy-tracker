require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/api');

const { PORT } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use(cors());

app.use("/dist", express.static(path.join(__dirname, "../dist")));

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.set({ 'Content-Type': 'text/html; charset=UTF-8' });
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
  });
}

// bad route error handling
app.use((req, res) => res.sendStatus(404));

// express global error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred. Check server logs for details.' },
  };
  const errorObj = { ...defaultErr, ...err};
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port:${PORT}`);
});
 
module.exports = app;