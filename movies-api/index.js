import dotenv from 'dotenv';
import express from 'express';
import './db';
import './seedData';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import usersRouter from './api/users';
import session from 'express-session';
import authenticate from './authenticate';

dotenv.config();

const errHandler = (err, req, res) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

const port = process.env.PORT;

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use(errHandler);


app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});