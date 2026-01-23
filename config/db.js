import mongoose from "mongoose";
const connect = mongoose.connect(MONGO_URI);
if (connect) {
  console.log("Database connected");
} else {
  console.log("errror  ");
}
