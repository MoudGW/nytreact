const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bodyParser = require("body-parser");
const path=require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//const port = 9000;
// Set up a default port, configure mongoose, configure our middleware
const PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets if in production (running on Heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/client/build"));
} else {
  app.use(express.static(__dirname + "/client/public"));
}

// enable CORS, use:
// https://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});

// Routing
var articlesController = require("./controllers/Articles-routes.js");

var router = new express.Router();
// Define any API routes first
// Get saved articles
router.get("/api/articles", articlesController.find);
// Save articles
router.post("/api/articles", articlesController.insert);
// delete saved articles
router.delete("/api/articles/:id", articlesController.delete);
// Send every other request to the React app
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.use(router);

// Connect mongoose to our database
const db = process.env.MONGODB_URI || "mongodb://localhost/nyt-react";
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.error(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Start the server
server.listen(PORT);


io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('articles',function (data) {
  socket.broadcast.emit('article',data);
  });
});