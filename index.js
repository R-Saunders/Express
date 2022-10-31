// This is for creating a server using express
// Imports
// Import express from 'express';
const express = require("express");
// Axios
const axios = require("axios");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

// Mongoose Dependancy
const mongoose = require("mongoose");

// Connect the database
const DB = process.env.DATABASE;
const connectDB = mongoose.connect(DB);
console.log(connectDB);

// Run express when this page is rendered/loaded
const app = express();

//const res = require('express/lib/response');
// Middlewares
// Middleware for CORS
app.use(cors());
// Middleware for JSON data recieving
app.use(express.json());

// File System
const fs = require("fs");

// Data
const beasts = require("./Data/beasts.json");

// Routes
app.get("/", (request, response) => {
	response.send("<h1>Hello</h1>");
	console.log(beasts);
});

// Route 2
app.get("/v", (req, res) => {
	res.send("<h1>V is the best </h1>");
});

// // Route 3
app.get("/beasts", (req, res) => {
	res.json(beasts);
});

// Route 4 --> getting beasts by single record --> params
app.get("/beasts/:id", (req, res) => {
	const id = parseInt(req.params.id);
	//console.log(typeof(id));

	//Using array filter method to get th exact data
	res.send(beasts.filter((items) => items.id === id));
});

// Params
app.get("/beasts/:id", (req, res) => {
	console.log("***************************");
	const _id = parseInt(req.params.id);
	res.send(beasts.filter((items) => items.id === _id));
});

// Queries
app.get("/beasty", (req, res) => {
	//http://localhost:8011/beasty?name=something
	const _name = req.query.name;
	res.send(beasts.filter((items) => items.description === _name));
});

// Route 5 --> To get the query info from the URL --> query
app.get("/beast", (req, res) => {
	//console.log(req.query);
	//http://localhost:8011/beast?name=Hydra

	const name = req.query.name;
	res.send(beasts.filter((item) => item.name === name));
});

// Route 5 --> getting data from external API
const reqAPI = `https://api.sampleapis.com/wines/reds`;

app.get("/wines", async (req, res) => {
	const reqAPIResult = await axios.get(reqAPI);
	res.json(reqAPIResult.data);
});

// Route for posting
app.post("/beasts", (req, res) => {
	const _id = beasts.length - 1;

	// Adding two objects
	const newDataToBeAddedToBeasts = Object.assign({ id: _id }, req.body);

	// Adding to the array
	beasts.push(newDataToBeAddedToBeasts);

	// Converting the object to an JSON
	const neArray = JSON.stringify(beasts);

	console.log(neArray);
	// Methods to write the data
	// fs.writeFile(arg1,arg2,arg3*);
	// arg1 is the data path
	// arg2 is new data to be added
	// arg3 is a function which gets triggered when the method is called
	fs.writeFile("./Data/beasts.json", neArray, () => {
		res.send(newDataToBeAddedToBeasts);
	});

	// Final step
});

// MongoDB CRUD operations
// Create a schema

const beastsSchema = new mongoose.Schema({
	name: String,
	heads: Number,
	mythology: String,
});

// Create a Modal
const beastsModal = mongoose.model("Names", beastsSchema);

app.post("/beasts/create", (req, res) => {
	// Create a new obj
	const newData = new beastsModal({
		name: "Cyclops",
		heads: 1,
		mythology: "Greek",
	});
	newData.save();
	res.send("Data Sent Successfully");
});

// Get all data
app.get('/read',async(req,res)=>{
  console.log('hey');

  const allData = await beastsModal.find();
  console.log(allData);
  res.send(allData);
})

// Get one record
app.get('/read/:id',async(req,res)=>{
  const _id = req.params.id;
  const reqData = await beastsModal.findById(_id);
  res.send(reqData);
});

app.listen(8011, () => {
	console.log("http://localhost:8011");
});