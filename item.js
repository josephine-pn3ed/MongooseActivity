const mongoose = require("mongoose");
var Schema = new mongoose.Schema({
   item: {type:String, required:true},
   quantity: {type: Number, required: true},
   priority: {type: Number, required: true},
});

Schema.statics.addPerson = async function (person){
   var Person = new this(person);
   var result =  await Person.save(person);
   return result;
}

Schema.statics.findItem = async function (item) {
	return await this.findOne({"item": item});
}

Schema.statics.countItems = async function() {
	return this.countDocuments();
}

Schema.statics.getItems = async function() {
   return await this.find();
}

Schema.statics.deleteItem = async function (element) {
   return await this.deleteOne({"item" : element});
}

module.exports = mongoose.model('person', Schema);