const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const connectDB = require("./config/db");

const userRoute = require("./routes/UserRouter");
const movieRoute=require('./routes/MovieRouter');
const genreRoute=require('./routes/genreRouter');
// const authMiddleware = require("./controllers/authMiddleware");
// const testMiddleware = require("./controllers/testMiddleware");

const app = express();

connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running...");
});
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});