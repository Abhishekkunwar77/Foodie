import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://abhi:1616@cluster0.xa3uy.mongodb.net/food-del')
    .then(()=>console.log("DB connected"));
      
}
