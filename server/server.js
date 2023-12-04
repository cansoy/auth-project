const path =require("path")
require("dotenv").config()
const expres=require("express")
const session =require("express-session")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const passport=require("passport")
const LocalStrategy =require("passport-local").Strategy
const {v4} =require("uuid")
const helmet =require("helmet")
const hpp=require("hpp")
const jwt =require("jsonwebtoken")
const axios =require("axios").default

const dbConnect=require("./db/dbConnect")
const UserSchema =require("./db/models/userSchema")
const passportAuth=require("./auth/passportAuth")
const userAuthorized=require("./middlewares/userAuthorized")

const PORT =process.env.PORT || 3000

const server=expres()
dbConnect()

server.use(helmet())
server.use(hpp())
server.use(cors({origin:process.env.CLIENT_ORIGIN_1,credentials:true}))
server.use(cookieParser())
server.use(session({
    name:"serverSession",
    genid:v4,
    resave:false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET
}))

server.use(expres.json())

server.use(passport.initialize())
server.use(passport.session())
passport.use(new LocalStrategy(passportAuth))
passport.serializeUser((userObj,cb)=>cb(null,userObj))
passport.deserializeUser((userObj,cb)=>cb(null,userObj))


server.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const user=new UserSchema({
            name:name,
            email:email,
            password:password
        })
        await user.save()
    } catch (error) {
        if (error.name==="ValidationError") {
          return  res.json({err:error.message})
        }
    }
    res.json({data:"done-registered"})
})


server.post("/login",(req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
        if (err) {
            return res.status(400).json({err:"Bad Request !"})
        }
        if (!user) {
            return res.status(401).json({err:"Unauthorized !"})
        }
        const accessToken =jwt.sign({...user,time:new Date().getTime()},process.env.ACCESS_TOKEN_SECRET,{expiresIn:1000*60*15})
        const refreshToken =jwt.sign({...user,time:new Date().getTime()},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"1d"})
        res.cookie("refreshToken",refreshToken,{httpOnly:true,sameSite:"none",secure:"none"})
        res.cookie("anotherCryptedCookie",`anotherCryptedCookie_${Math.random()}`,{httpOnly:true,sameSite:"none",secure:"none"})
        res.json({accessToken:accessToken,user:user})
    })(req,res,next)
})

server.get("/users",userAuthorized,async(req,res)=>{
    const request=await axios.get("https://jsonplaceholder.typicode.com/users")
    const users =request.data
    return  res.json({data:"keepOnVisit",err:null,users:users})
})

server.get("/users/:id",userAuthorized,async(req,res)=>{
    const {id}=req.params
    const request=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    const users =request.data
    return  res.json({data:"keepOnVisit",err:null,users:users})
})

server.get("/logout",(req,res)=>{
    req.session.destroy()
    res.cookie("refreshToken","refreshToken",{httpOnly:true,sameSite:"none",secure:"none",maxAge:0})
    res.cookie("anotherCryptedCookie",`killedByServer`,{httpOnly:true,sameSite:"none",secure:"none",maxAge:0})
    res.json({you:"logout"})
})




server.listen(PORT,()=>console.log("*********************************************"))