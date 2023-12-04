const mongoose =require("mongoose")
const bcrypt =require("bcrypt")
const validator =require("validator")

const dbConnect =async(req,res,next)=>{
    const connection =await mongoose.connect(process.env.MONGO_DB_PATH)
    const state =await connection.connection.readyState
    console.log("server connection state:",state)
    return state
}

module.exports=dbConnect
