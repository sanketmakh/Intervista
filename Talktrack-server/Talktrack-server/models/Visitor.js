const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const VisitorSchema = new Schema({
  count: {type: String},
  
});

const VisitorModel = model('Visitor', VisitorSchema);

module.exports = VisitorModel;