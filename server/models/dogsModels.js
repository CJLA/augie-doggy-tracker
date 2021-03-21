const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const { Schema } = mongoose; 

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useunifiedTopology: true,
    dbName: 'dogs'
  });
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

  const dogsSchema = new Schema({
    name: { type: String, required: true },
    heartworm: { name: { type: String, default: 'Heartworm' }, frequency: String, adminDate: Date, dueDate: Date, supply: Number },
    fleaTick: { name: { type: String, default: 'Flea & Tick' }, frequency: String, adminDate: Date, dueDate: Date, supply: Number },
    vaccines: [{ name: String, data: { frequency: String, adminDate: Date, dueDate: Date } }]
  });
  
  const Dog = mongoose.model('Dog', dogsSchema);
  
  module.exports = {
    Dog
  }