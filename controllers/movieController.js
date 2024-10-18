const Movie = require("../models/MovieModel");
const moviesData = require("../moviesData");

exports.importMovies = async (req, res) => {
  await Movie.deleteMany({});
  const movies = await Movie.insertMany(moviesData);
  res.status(201).json(movies);
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.json(movies);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.getMoviesById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404);
      throw new Error("movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTopMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ rating: -1 });
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getPopularMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort({ popularity: -1 });
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRandomMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    const randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 9);
    res.json(randomMovies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getMoviesByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await Movie.find({ genre: genre });
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.writeReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const review = {
        name: req.user.name,
        id: req.user._id,
        rating: Number(rating),
        comment,
      };
      movie.reviews.push(review);
      const totalRatings = movie.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const newAverageRating = totalRatings / movie.reviews.length;

      movie.rating = newAverageRating;
      await movie.save();
      res.status(201).json({ message: "Review added successfully" });
    } else {
      res.status(404);
      throw new Error("movie not found");
    }
  } catch (error) {}
};
exports.createMovie = async (req, res) => {
  try {
    const {
      name,
      popularity,
      poster,
      rating,
      description,
      genre,
      first_air_date,
    } = req.body;
    const movie = new Movie({  name,
        popularity,
        poster,
        rating,
        description,
        genre,
        first_air_date,
        userId:req.user._id
    })
    if(movie){
        const createdMovie=movie.save();
        res.status(201).json(createdMovie)
    }else{
        res.status(400)
        throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateMovie=async(req,res)=>{
    try {
        const {
            name,
            popularity,
            poster,
            rating,
            description,
            genre,
            first_air_date,
          } = req.body;
          const movie=await Movie.findByIdAndUpdate(req.params.id,{
            name,
            popularity,
            poster,
            rating,
            description,
            genre,
            first_air_date,
          },{new:true});
          if(movie){
            res.status(201).json(movie)
          }else{
            res.status(404);
            throw new Error('movie not found')
          }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.deleteMovie=async(req,res)=>{
    try {
        const movie=await Movie.findByIdAndDelete(req.params.id);
        if(movie){
            res.json({message:" movie deleted successfully"})
        }else{
            res.status(404)
            throw new Error("movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
