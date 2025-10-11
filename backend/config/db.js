import mongoose from "mongoose";
const connectdb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected database')
    } catch (error) {
        console.log({error})
    }
//     mongoose.connect(process.env.MONGODB_URL)
// .then(() => console.log("✅ MongoDB Connected!"))
// .catch(err => console.error("❌ MongoDB Error:", err));
 }

export default connectdb