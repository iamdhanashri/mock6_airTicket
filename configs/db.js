
const mongoose=require("mongoose")

const dbConnection=mongoose.connect("mongodb+srv://dhanashri:ahire@cluster0.1t4wpeq.mongodb.net/airTicket")

module.exports={
    dbConnection
}