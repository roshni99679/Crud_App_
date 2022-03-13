const express=require("express")
const router=express.Router()
const users=require("../models/userSchema")

// router.get("/",(req,res)=>{
//     res.json("connected")
// })

//register the user
router.post("/register",async(req,res)=>{
    console.log(req.body)
    const {name,email,mobile,occupation,text}=req.body;
    if(!name || !email || !mobile || !occupation || !text){
        res.status(422).json("Please fill in all the Fields")
    }
    try{
        const preuser=await users.findOne({email:email});
        console.log(preuser)

        if(preuser){
            res.status(422).json("User with this email id already exists")
        }else{
            const adduser=new users({
                name,email,mobile,occupation,text
            })

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser)
        }
        
    }catch(error){
        res.status(422).json(error)
    }
})


//get user's data
router.get("/getdata",async(req,res)=>{
    try{
        const userdata=await users.find()
        res.status(201).json(userdata)
        console.log(userdata)
    }catch(error){
        res.status(422).json(error)
    }
})

//get individual user
router.get("/getuser/:id",async(req,res)=>{
    try{
        console.log(req.params)
        const {id}=req.params;
        const userIndividual=await users.findById({_id:id})
        console.log(userIndividual)
        res.status(201).json(userIndividual)

    }catch(error){
        res.status(422).json(error)
    }
})

//update user data
router.patch("/updateuser/:id",async(req,res)=>{
    try{
        console.log(req.params)
        const {id}=req.params;
        const updateUser=await users.findByIdAndUpdate(id,req.body,{
            new:true
        })
        console.log(updateUser)
        res.status(201).json(updateUser)

    }catch(error){
        res.status(422).json(error)
    }
})

//delete user data
router.delete("/deleteuser/:id",async(req,res)=>{
    try{
        
        const {id}=req.params;
        
        const deleteUser=await users.findByIdAndDelete({_id:id})
        console.log(deleteUser)
        res.status(201).json(deleteUser)

    }catch(error){
        res.status(422).json(error)
    }
})

module.exports=router;
