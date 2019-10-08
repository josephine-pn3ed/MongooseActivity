const items = require("./item");
module.retrieveAll = function (req, res) {
	console.log("retrieving all...")
	const test2 = async function () {
		const elements = await items.getItems();
		res.send(elements)
	}
	test2();
}
module.create = function (req, res) {
	console.log("creating...");
	req.on('data', function (req) {
		store = JSON.parse(req);
		const test2 = async function () {
			const data = {
				item: store.item,
				quantity: store.quantity,
				priority: store.priority
			}
			await items.addPerson(data);
			const item = await items.getLastItem();
			res.send(item)
		}
		test2();
	});
	req.on('end', function () { })
}
module.retrieveOne = function (req, res) {
	console.log("retrieving...");
	const test = async function () {
		console.log(req.params.id)
		const result = await items.findItem(req.params.id);
		res.send(result);
	}
	test();
}
module.update = function (req, res) {
	console.log("updating...");
	req.on('data', function (req) {
		store = JSON.parse(req);
		console.log(store.id);
		const test = async function () {
			const result = await items.updateItem(store.id, store.item, store.quantity, store.priority);
			const updated = await items.findItem(store.id);
			res.send(updated);
		}
		test();
	})
	req.on('end', function () { })
}
module.delete = function (req, res) {
	console.log("deleting...");
	req.on('data', function (req) {
		store = JSON.parse(req);
		res.send("success")
		const test2 = async function () {
			const p = await items.deleteItem(store.id);
			console.log(p);
		}
		test2();

	});
	req.on('end', function () { })
}
