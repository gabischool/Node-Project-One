// Initialize express app
import express from 'express'
import { nanoid } from 'nanoid'
import { find, findById, insert, remove, update } from './users/model.js'
import bodyParser from 'body-parser'

const app = express()
app.use (bodyParser.json());
// GET ALL USERS
app.get('/api/users', async(req, res) => {
    const users = await find();
    res.json(users)
  });

// GET USER BY ID

app.get('/api/users/:id', async(req, res) => {
  const user = await findById(req.params.id);
  if(user){
  res.json(user)
  }else{
    res.status (404).json({message: 'user not found'})
  }
});

// CREATE A NEW USER

app.post('/api/users/add', async(req, res) => {
  // const {name, bio} = req.body
  const newUser = await insert(req.body);
  if(newUser){
  res.json(newUser)
  }else{
    res.status (400).json({message:'user was not created'})
  }
});


// UPDATE A USER

app.put('/api/users/update/:id', async(req, res) => {
  const updatedUser = await update(req.params.id, req.body);
  if(updatedUser){
  res.json(updatedUser)
  }else{
    res.status (404).json({message: 'user was not updated'})
  }
});

// DELETE A USER

app.delete('/api/users/delete/:id', async(req, res) => {
  const deletedUser = await remove(req.params.id);
  if(deletedUser){
  res.json({status: 200, message: `user with id ${req.params.id} deleted succesfully`})
  }else{
    res.status (404).json({message: 'user was not deleted'})
  }
});

// export default app

export default app;
