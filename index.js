const express=require("express")
const { dbConnection } = require("./configs/db")
const { userRouter } = require("./routes/user.route")
const { flightRouter } = require("./routes/flight.route")
const { bookingRouter } = require("./routes/booking.route")
const app=express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("homepage")
   
})

app.use("/api",userRouter)
app.use("/api",flightRouter)
app.use("/api",bookingRouter)

app.listen(8080,async()=>{
    try{
        await dbConnection
        console.log("connected to db")
    }
    catch(e){
        console.log(e.message)
    }
console.log("listening port at 8080")
})


