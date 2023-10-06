// Initialize express app
import express from 'express';
import bodyParser from 'body-parser';
import { find, findById, insert, remove, update } from './users/model.js';
const app = express();
app.use(bodyParser.json());



// GET ALL USERS
app.get('/api/users', async(req, res) => {
    const allUser =  await find();
    if(allUser) {
        res.json(allUser)
    }
    else{
        res.status(500).json({message : "The users information could not be retrieved"})
    }
})

// GET USER BY ID
app.get('/api/users/:id', async(req, res) => {
    const user = await findById(req.params.id);
    if(user) {
        res.json(user)
    }
    else {
        res.status(404).json({message: "The user with the specified ID does not exist"})
    }
})

// CREATE A NEW USER
app.post('/api/users', async(req, res) =>{
    const newUser = await insert(req.body);
    if(newUser) {
        res.json(newUser)
    }
    else{
        res.status(400).json({message:"Please provide name and bio for the user"})
    }
})

// UPDATE A USER
app.put('/api/users/:id', async(req, res) => {
    const updatedUser =await update(req.params.id, req.body);
    if(updatedUser){
        res.json(updatedUser)
    }
    else{
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

// DELETE A USER
app.delete('/api/users/:id', async(req, res) => {
    const delStudent = await remove(req.params.id);
    if(delStudent) {
        res.json(`The user with the specified ${req.params.id} was removed`)
    }
    else{
        res.status(500).json({ message: "The user could not be removed" })
    }
})


app.listen(9000, () => console.log("listening port 9000"))
// export default app
export default app;
