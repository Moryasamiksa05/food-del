import mongoose from "mongoose";

 export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://SamikshaMorya:6387021357@cluster0.gklsa.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}