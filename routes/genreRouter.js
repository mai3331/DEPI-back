const express = require('express');

const router = express.Router();

const {getGenre,createGenre,updategenre,deleteGenre}=require('../controllers/genreController')
const authMiddleware= require("../controllers/authMiddleware");
const Admin=require("../controllers/authMiddleware");
router.get('/', getGenre);
router.post('/',authMiddleware,Admin,createGenre)
router.put('/:id',authMiddleware,Admin,updategenre)
router.delete('/:id',authMiddleware,Admin,deleteGenre)
module.exports = router;