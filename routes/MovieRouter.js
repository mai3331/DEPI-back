const express = require('express');

const router = express.Router();

const authMiddleware= require("../controllers/authMiddleware");
const Admin=require("../controllers/authMiddleware");
const{ importMovies,getMovies,getMoviesById,getRandomMovies,getTopMovies,getMoviesByGenre ,getPopularMovies,writeReview,createMovie,updateMovie,deleteMovie}=require('../controllers/movieController')

router.post('/import', importMovies);
router.get('/', getMovies);
router.get('/:id', getMoviesById);
router.get('/genre/:genre', getMoviesByGenre);
router.get('/top/rated', getTopMovies);

router.get('/top/popular', getPopularMovies);
router.get('/random/all', getRandomMovies);
router.post('/:id/reviews',authMiddleware, writeReview);
router.post('/add',authMiddleware,Admin,createMovie);
router.put('/:id/update',authMiddleware,Admin,updateMovie);
router.delete('/:id/delete',authMiddleware,Admin,deleteMovie);

module.exports = router;