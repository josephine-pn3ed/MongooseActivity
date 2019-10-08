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

Schema.statics.findItem = async function (id) {
	return await this.findOne({_id: id});
}

Schema.statics.getItems = async function() {
   return await this.find();
}

Schema.statics.getLastItem = async function() {
   return await this.find().sort({_id:-1}).limit(1);
}

Schema.statics.updateItem = async function(id, newItem, newQuantity, newPriority) {
   return await this.updateOne({_id: id},{$set: {item: newItem, quantity: newQuantity, priority: newPriority}});
}

Schema.statics.deleteItem = async function (id) {
   return await this.deleteOne({_id: id});
}
Schema.statics.path('item').validate(function(value, respond) {
   this.findOne({item: value}, function(err, user) {
     if(err) throw err;
     if(user) return respond(false);
     respond(true);
   });
 }, 'exists');
 
 Schema.statics.path('quantity').validate(function(value, respond) {
   this.findOne({quantity: value}, function(err, user) {
     if(err) throw err;
     if(user) return respond(false);
     respond(true);
   });
 }, 'exists');

module.exports = mongoose.model('person', Schema);