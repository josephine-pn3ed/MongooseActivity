
const express = require('express')
const app = express();
const path = require("path");
const test = require("./test");

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/groceryList', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("we're connected")
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.get("/item/retrieve/all", function (req, res) {
	test.retrieveAll(res, req);
})

app.put("/item/create", function (req, res) {
	test.create(req, res);
})

app.get("/item/retrieve/:id", function (req, res) {
	test.retrieveOne(req, res);
})

app.post("/item/update", function (req, res) {
	test.update(req, res);
})

app.delete("/item/delete", function (req, res) {
	test.delete(req, res);
})

app.listen(3000, function () {
	console.log("Connected!")
})