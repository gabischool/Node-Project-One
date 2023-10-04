// Initialize express app
// import bodyParser from "body-parser";
// // import express from "express";
// import express from 'express'
// import { find } from "./users/model";
// const server = express();

// server.use(bodyParser.json());
import express from 'express';
import bodyParser from 'body-parser';
import { find, findById, insert, remove, update, } from './users/model.js';
const app = express();
app.use(bodyParser.json());

// GET ALL USERS
app.get('/users', async(req, res)=>{
    const allUsers = await find();
    res.json(allUsers)
});
// GET USER BY ID
app.get('/users/:id', async( req, res)=>{
    const find_by_id = await findById(req.params.id)
    if(find_by_id){
        res.json(find_by_id)
    }else{
        res.status(400).json({status:400,messsage:'user not found'})
    }
})

// CREATE A NEW USER

app.post('/users', async(req , res)=>{
    const add_user = await insert(req.body);
    if(add_user){
        res.json(add_user)
    }else{
        res.status(400).json({status:400, message:'Can not add new user'})
    }
})

// UPDATE A USER
app.put('/users/:id',  async(req, res)=>{
    const update_user = await update(req.params.id, req.body);
    if(update_user){
        res.json(update_user)
    }else{
        res.status(400).json({status:400, message:'can not update user'})
    }
})

// DELETE A USER
app.delete('/users/:id', async(req, res)=>{
    const delete_user = await remove(req.params.id, req.body);
    if(delete_user){
        res.json(`the user with the id of ${req.params.id} successfully deleted`);
    }else{
        res.status(400).json({status:400, message:`the user with the id of ${req.params.id} not deleted`})
    }
});


app.listen(9000,()=>console.log("listening port 9000"))
export default app;
