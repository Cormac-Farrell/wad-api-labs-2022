import express from 'express';
import Genre from './genresModel';

const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.json(genres);
});



export default router;