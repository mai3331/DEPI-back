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
  origin: 'http://localhost:3000',
  credentials: true, 
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running...");
});
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
