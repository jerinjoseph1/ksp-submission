var {mongoose} = require('../connect');

const dbSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  State: String,
  District_Name: String,
  PS_Name: String,
  FIRNo: String,
  FIR_Date: String,
  Person_No: String,
  Arrest_Date: String,
  Person_Name: String,
  Father_Name: String,
  Gender: String,
  AgeWhileOpening: Number,
  Age: Number,
  Pres_Address1: {
    type:String,
    default: ' '

  },
  Perm_Address1: {
    type:String,
    default: ' '

  },
  PersonStatus: String,
  Name: String,
  Major_Head: String,
  Minor_Head: String,
  Crime_No: Number,
  Arr_ID: Number,
  Unit_ID: Number,
  FIR_ID: Number,
  DEDT: String,
  Photo_Full_front:{
    type:String,
    default: ' '

  },
  Fingerprint:{
    type:String,
    default: ' '

  }
},{ collection: 'state_police'});
  
const statePoliceModel = mongoose.model('state_police', dbSchema);
module.exports={statePoliceModel}