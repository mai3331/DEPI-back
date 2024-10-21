const express = require('express');

const router = express.Router();
const authMiddleware = require("../controllers/authMiddleware");
const { login, register,updateUser,getLikedMovies,addToFavourites,removeFavorites} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.put('/update',authMiddleware,updateUser);
router.get('/favorites',authMiddleware,getLikedMovies);
router.post('/favorites',authMiddleware,addToFavourites);
router.delete('/favorites',authMiddleware,removeFavorites);

module.exports = router;