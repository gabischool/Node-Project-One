// Initialize express app
import express from 'express'
import http from 'http'
import {find, findById, insert, update, remove} from './users/model.js'
// const  server  =require('http')
const app  = express()
app.use(express.json())
http.createServer((req,res)=>{
    res.json({Message:"get starting"})
})
app.get("/api/users", async (req, res) => {
    const allUsers = await find();
    res.json(allUsers)
})

// find user by id 
app.get("/api/users/:id", async (req, res) => {
    let id   = req.params.id
    const singleUser = await findById(id);
    if(singleUser){
        res.status(200).json(singleUser)
    }else{
        res.status(404).json({Message:`we can't find the user with id  of ${id}`})
    }
  
})
app.post('/api/users/insert',async(req,res)=>{
    const newUser  = await insert(req.body);
    if(newUser){
        res.status(200).json({Message:"User Inserted Success !"})
    }else{
        res.status(500).json({Message:"Failed to Insert the record try  again "})
    }
  
})
app.put('/api/users/update/:id',async(req,res)=>{
    const id  =  req.params.id 
    const body = req.body 
    const updateUser =  await update(id,body)
    if(updateUser){
        res.status(200).json({Message:"updated Success"})
    }else{
        res.status(500).json({Message:"user not updated , try again "})
    }
})

app.listen(2000,(req,res)=>{
    console.log("app is running .... ")
})
// GET ALL USERS

// GET USER BY ID

// CREATE A NEW USER

// UPDATE A USER

// DELETE A USER

// export default app
export default app;
