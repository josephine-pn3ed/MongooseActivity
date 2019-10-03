
const express = require('express')
const app = express();
const path = require("path");
const items = require("./item");

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/groceryList', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected")
});

app.get("/item/retrieve/all", function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.put("/item/create", function (req, res) {
	console.log("created");
	req.on('data', function (req) {
        store = JSON.parse(req);
        res.send("success")
		const test2 = async function(){
			const count = await items.countItems();
		   	console.log(count);
		   	const data = {
		   		ID: count+1,
		       	item: store.item,
		       	quantity: store.quantity,
		      	priority: store.priority
		   	}
		   	await items.addPerson(data);
		   	const p = await items.listPersons();
		   	console.log(p);
		}
		test2();

    });
    req.on('end', function () {})
})



app.get("/item/retrieve/:id", function (req, res) {
	const test = async function(){
		const p = await items.findItem(req.params.id);
		console.log(p);
	}
	test();
})

app.post("/item/update", function (req, res) {

})

// app.del("/item/delete", function (req, res) {

// })

app.listen(3000, function() {
	console.log("Connected!")
})