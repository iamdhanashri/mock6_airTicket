

const express=require("express")

const userRouter=express.Router()

const jwt=require("jsonwebtoken")

const bcrypt=require("bcrypt")
const { UserModel } = require("../model/user.model")

userRouter.post("/register",async(req,res)=>{
  
    const {name,email,password}=req.body
    try{
     bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.send({msg:"user registration failed",error:err.message})
        }else{
            const user=new UserModel({name,email,password:hash})
            await user.save()
            res.status(201).send("user registration successful")
        }
     })
    }
    catch(e){
        res.send({msg:"user registration failed",error:e.message})
    
    }
})


// login 

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
    const user=await UserModel.find({email})
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
              let token=jwt.sign({userID:user[0]._id},"masai")
              res.status(201).send({msg:"login sucess",token:token})  
            }else{
                res.send("user registration failed")
            }
        })
    }
    else{
        res.send("wrong credentials")
    }
    }
    catch(e){
        res.send({msg:"user login failed",error:e.message})
    }
})

module.exports={
    userRouter
}