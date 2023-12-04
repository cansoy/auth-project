const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const UserSchema=require("../db/models/userSchema")

const passportAuth=async(username,password,cb)=>{
    const user =await UserSchema.findByMyCredentials(username,password)
    if (user==="User Couldnt Find !") {
        return cb(false)
    }

    return cb(null,{username:user.name,roles:[101,102]})
}

module.exports=passportAuth