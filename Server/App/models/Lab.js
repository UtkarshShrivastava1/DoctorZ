const mongoose=require("mongoose");

const labSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },

  // Tests -> array of objects
  tests: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],

  // Pricing optional (kyunki tum tests me hi price store kar rahe ho)
  pricing: {
    type: Map,
    of: Number,
  },

  // Timings -> open / close
  timings: {
    open: { type: String, required: true },
    close: { type: String, required: true }
  }
});


const labTestBooking=new mongoose.Schema({
  labId:{type:mongoose.Schema.Types.ObjectId,ref:'Lab'},
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'LabUser'},
  testName:{type:String,required:true},
  bookingDate:{type:Date,default:Date.now()},
  status: {
  type: String,
  default: "pending"   
}

})
 const LabTestBookingModel=mongoose.model('LabTestBooking',labTestBooking)
const Lab = mongoose.model('Lab', labSchema);

module.exports = { Lab, LabTestBookingModel };