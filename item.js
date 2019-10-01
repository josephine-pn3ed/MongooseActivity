const mongoose = require("mongoose");
var Schema = new mongoose.Schema({
   item: {type:String, required:true},
   quantity: {type: Number, required: true},
   priority: {type: Number, required: true},
});

Schema.statics.addPerson = async function(person){
   var Person = new this(person);
   var result =  await Person.save(person);
   return result;
}

Schema.statics.listPersons = async function(){
   return await this.find();
}

module.exports = mongoose.model('person', Schema);