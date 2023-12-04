const mongoose=require("mongoose")
const validator =require("validator").default
const bcrypt=require("bcrypt")
const Schema =mongoose.Schema

const userSchema =new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
        validate:{
            validator:validator.isEmail,
            message:"Please Enter Email Type !"
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:4,
    }
})

userSchema.pre("save",async function(next){
    const user =this
    const genSalt =await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(this.password,genSalt)
    this.password=hashedPassword
    next()
})

userSchema.statics.findByMyCredentials=async function(name,password){
    try {
        const user =await this.findOne({name:name})
        if (!user) {
            throw new Error("")
        }
        const compare=await bcrypt.compare(password,user.password)
        if (!compare) {
            throw new Error("")
        }
        return user
    } catch (error) {
        return "User Couldnt Find !"
    }
}

const UserSchema=mongoose.model("UserSchema",userSchema)

module.exports=UserSchema