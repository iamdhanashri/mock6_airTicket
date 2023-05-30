

const express = require("express");

const bookingRouter = express.Router();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const { FlightModel } = require("../model/flight.model");
const { BookingModel } = require("../model/booking.model");

// booking post 

bookingRouter.post("/booking",async(req,res)=>{
  
try{
const {userID,flightID}=req.body

const user=await UserModel.findById(userID)
const flight=await FlightModel.findById(flightID)

if(!user || !flight){
    res.send("user or flight not available")
}
if(flight.seats<=0){
    res.send("seat not available")
}

const booking= new BookingModel({
    user:user._id,
    flight:flight._id
})

flight.seats -= 1 

await flight.save()

await booking.save()

res.status(201).send("booking created successfully")

}
catch(e){
  res.send(e.message)
}

})

// dashboard get 


bookingRouter.get("/dashboard",async(req,res)=>{
    try{
    const book=await BookingModel.find().populate("user flight")
    res.status(200).send(book)
    }
    catch(e){
  res.send(e.message)
    
    }
})


module.exports={
    bookingRouter
}

