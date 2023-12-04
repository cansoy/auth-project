const jwt =require("jsonwebtoken")

const userAuthorized =(req,res,next)=>{
    
    const cookies=req.cookies
     let refreshToken=req.cookies.refreshToken
     let anotherCryptedCookie=req.cookies.anotherCryptedCookie
     try {
        const verify =jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        refreshToken=jwt.sign({...verify,time:new Date().getTime()},process.env.REFRESH_TOKEN_SECRET)
        res.cookie("refreshToken",refreshToken,{httpOnly:true,sameSite:"none",secure:"none"})
        res.cookie("anotherCryptedCookie",`anotherCryptedCookie_${Math.random()}`,{httpOnly:true,sameSite:"none",secure:"none"})
        next()
     } catch (error) {
       return res.json({err:"tokenWrong",data:null})
     }
}

module.exports=userAuthorized