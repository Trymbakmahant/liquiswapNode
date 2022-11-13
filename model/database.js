import mongoose from "mongoose";
// contract address   wallet address  token name , token amount, time  , methods  ;
const userData = new mongoose.Schema({
  Address: { type: String, required: true },
  cid: { type: String, required: true },
});

export const UserData = mongoose.model("UserData", userData);
