// Initialize express app
import express from "express";
import { find, findById, insert, update, remove } from "./users/model.js";
const app = express();

app.use(express.json());

// GET ALL USERS
app.get ('/api/users', async(req, res)=> {
    const Allusers = await  find();
    if (Allusers){
       res.json(Allusers);
    }
    else{
        res.status(404).json({ massege : 'users not found'});
    }

})


// GET USER BY ID
app.get('/api/users/id ' , async(req, res ) =>{
    const user = await findById(req.params.id);
  if (user) {
    res.json(user);
  }
  else {
    res.status(404).json({message: 'User not found '});
  }
});


// CREATE A NEW USER
app.post("/api/users", async (req, res) => {
    const Newuser = await insert(req.body);
    if (Newuser) {
      res.json(Newuser);
    } else {
      res.status(400).json({ message: "was not a found" });
    }
  });

// UPDATE A USER
app.put('/api/users/:id', async (req, res) => {
    const User = await update(req.params.id, req.body);
    if(User){
        res.json(User);
        res.status(200).json({message: 'User already  was updated successfully'});
    }
    else {
        res.status(400).json({ message :'user was not updated' });
    }
});

// DELETE A USER
app.delete('/api/users/:id', async (req, res) => {
    const deleteUser = await  remove(req.params.id);
    if (deleteUser){
        res.status(200).json({ message :`user was  ${req.params.id}  deleted`});
    }
    else {
        res.status(404).json({ message :"User was not deleted" });
    }
});

// export default app
export default app;
