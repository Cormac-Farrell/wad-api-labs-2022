import dotenv from 'dotenv';
import express from 'express';
import './db';
import './seedData';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import usersRouter from './api/users';
import session from 'express-session';
import authenticate from './authenticate';
import https from 'https';
import fs from 'fs';

dotenv.config();

const errHandler = (err, req, res) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const checkIfSecure = (req, res, next)=>{
  if(req.secure){
    //All Good - call next middleware
    return next();
  }
  //insecure, redirect
  res.redirect('https://' + req.hostname + ":8081" + req.url); // express 4.x
}

const app = express();

app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

const port = process.env.PORT;
app.all('*', checkIfSecure); 
app.use(express.json());
app.use('/api/genres', genresRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use(errHandler);


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

tlsServer.listen(8081,()=>{
  console.log('Secure server is listening on port 8081')
  })