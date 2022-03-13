const mongoose=require("mongoose")
const DB="mongodb+srv://rosh:roshrosh@cluster0.tavkt.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("Connected to mongodb")).catch((error)=> console.log(error.message));