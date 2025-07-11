import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items:{type: Array, required: true},
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
   status: { type: String, default : "Food is being prepared"},
   data:{type: Date, default: Date.now},
   payment : { type: Boolean, default: false },
    

})

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
