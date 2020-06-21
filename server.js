"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var cors = require("cors");

// for dns.lookup
var dns = require("dns");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/

app.use(cors());
app.use(express.json());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function() {
  console.log("Node.js listening ...");
});

// mongoose.connect(process.env.DB_URI);
const uri = process.env.MONGO_URI;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
  },
  err => {
    if (err) {
      console.log("not connected to DB => error: " + err);
    } else {
      console.log("connection completed to DB");
    }
  }
);

console.log("conn status:  " + mongoose.connection.readyState);

// schema

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String
});

const URL = mongoose.model("URL", urlSchema);

// post

app.post("/api/shorturl/new", function(req, res) {
  
  var urlFixed = req.body.url.replace(/^(http[s]*:\/\/)/i, "");

  dns.lookup(urlFixed, function(err, address) {
    if (err) {
      return res.json({ error: "invalid URL" });
    } else {
      URL.findOne({ original_url: req.body.url }, function(err, result) {
        if (err) console.log(err);
        if (result) {
          return res.json({
            original_url: result.original_url,
            short_url: result.short_url
          });
        } else {
          var short_id = Date.now();

          var newUrl = new URL({
            original_url: req.body.url,
            short_url: short_id
          });

          newUrl.save();

          res.json({ original_url: req.body.url, short_url: short_id });
        }
      });
    }
  });
});

// get

app.get("/api/shorturl/:id", function(req, res) {
  URL.findOne(
    {
      short_url: req.params.id
    },
    function(err, data) {
      if (err) {
        console.log(err);
      } else if (!data) {
        res.json({
          error: "URL not found."
        });
      } else {
        res.redirect(data.original_url);
      }
    }
  );
});
