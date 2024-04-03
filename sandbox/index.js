//Strict mode enabled, which make coding more secure and allows you to catch common errors.
"use strict";

//Import Express.js Library
const express = require("express");

//Instaite Express instance and assign it to variable "app"
const app = express();

//Imports multer library, for web form uploads
const multer = require("multer");

//Uses's express library's "urlEncoded()" method to parse the URL-encoded data into something readable for the recieving server.
app.use(express.urlencoded({ extended: true }));

//Uses's the Multer middleware to parse the incoming request with form data. (Specifcally any uploaded files within a request.)
app.use(multer().none());

//Uses the express library's built-in middleware JSON parses for requsts that have a JSON payload.
app.use(express.json());

//An HTTP GET Request Handler written using Express.JS
app.get("/hello", function (req, res) {
  //Response type will be plain "text"
  res.type("text");
  //Actual response sent back to the client from the server will be "Hello World!"
  res.send("Hello World!");
});

//Sets up a handler (route) for a GET request to the endpoint "/math/circle/" with an route attribute of "radius".
app.get("/math/circle/:radius", function (req, res) {
  //When this route attribute "radius" is entered after the route path ("/math/circle/"), then it will parse from a string to a float number and used in mathmatical calculations.
  let radius = parseFloat(req.params.radius);
  res.type("json");
  let myAnswer = {
    area: 3.14 * radius * radius,
    circumference: 2 * 3.14 * radius,
  };
  res.send(myAnswer);
});


app.get("/math/rectangle/:width/:height", function (req, res) {
  //JSON Content-type
  res.type("json");
  //get user-typed width value
  let width = parseFloat(req.params.width);
  //get user-typed height value
  let height = parseFloat(req.params.height);

  //JSON response
  let answer = {
    //Var for Area, using the width and height variables declared above
    areaOfSquare: width * height,
    //Var for perimeter, using the width and height variables declared above
    perimeterOfSquare: width * 2 + height * 2,
  };
  //Send calculated JSON response
  res.send(answer);
});

//Express handler/route for a post request to the path/endpoint "/helloPost".
app.post("/helloPost", function (req, res) {
  //From the request's body, the name attribute is extracted.
  const name = req.body.name;
  res.type("text");
  res.send("Hello " + name);
});

console.log("Hello CodeSandbox");
const PORT = process.env.PORT || 8000;
app.listen(PORT);
