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
