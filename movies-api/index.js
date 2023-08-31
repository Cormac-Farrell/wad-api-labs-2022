import dotenv from 'dotenv';
import express from 'express';
import './db';
import './seedData';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import usersRouter from './api/users';
import passport from './authenticate';

dotenv.config();

const app = express();

app.use(passport.initialize());

const port = process.env.PORT;

app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
app.use(errHandler);


app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});