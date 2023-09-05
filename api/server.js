// server.js
import express from 'express';
import { find, findById, insert, update, remove } from './users/model.js';
const app = express();


import bodyParser from 'body-parser';
app.use(bodyParser.json())

import cors from 'cors'
app.use(cors())

// GET ALL USERS
app.get('/api/users', async ( req, res ) => {
        const allUsers = await find();
        res.json(allUsers);
    //   console.error('Error fetching users:', err)
})

app.get('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    try{
        const user = await findById(userId);
       if(user){
           res.json(user);

       }else{
        res.status(404).json({ error: 'User not found' });
       }

    }catch (err) {
        console.error('Error fetching user by ID:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.post('/api/users', async (req, res) => {
    const NewUser = req.body
    try{
        const CreatUser = await insert(NewUser)
        res.json(CreatUser)
    }catch(err){
        console.error(err ,": Error creating user ")
    }
})

app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updateduser = req.body
    try{
        const Updateuser = await update(userId, updateduser);
       if(Updateuser){
           res.json(Updateuser);
          
       }else{
        res.status(404).json({ error: 'User not found' });
       }

    }catch (err) {
        console.error('Error Updating user Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    try{
        const DelateUser = await remove(userId);
       if(DelateUser){
           res.json({message :'User deleted successfully'});
          
       }else{
        res.status(404).json({ error: 'User not found' });
       }

    }catch (err) {
        console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})


export default app