// Initialize express app

import express from 'express';
import bodyParser from 'body-parser';
import { find, findById,insert,update,remove } from './users/model.js';
const app = express();
app.use(bodyParser.json());




// GET ALL USERS

app.get('/api/Users', async (req, res) => {
    const allUsers = await find();
    res.json(allUsers);
 })



// GET USER BY ID
app.get('/api/Users/:id', async (req, res) => {

    const user = await findById(req.params.id);
    if(user){
        res.json(user);
    }else{
        res.status(404).json({message: "User not found"})
    }
})

// CREATE A NEW USER
app.post('/api/Users/add', async (req,res) =>{
 const newUser = await insert(req.body);
 if(newUser){
    res.json(newUser);
 }else{
    res.status(500).json({message: "Error adding user"})
 }
})

// UPDATE A USER
app.put('/api/Users/update/:id', async (req,res) =>{
    const updateUser = await update(req.params.id, req.body);
    if(updateUser){
        res.json(updateUser)
    }else{
        res.status(400).json({
            message : "error update user"
        })
    }
 })

// DELETE A USER

app.delete('/api/Users/delete/:id',async (req, res) => {
    const deleteUser = await remove(req.params.id);
    if(deleteUser){
        res.json(deleteUser)
    }else{
        res.status(400).json({
            message : "error delete user"
        })
    }
})

// export default app
export default app;
