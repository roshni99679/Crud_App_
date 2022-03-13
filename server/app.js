require("dotenv").config()
const express=require('express')
const mongoose=require("mongoose")
const cors=require("cors")

const users=require("./models/userSchema")
const router =require("./routes/router")
require ("./db/conn")



const app=express()
const PORT=5000

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT,()=>{
    console.log("Listening at port",PORT)
})
