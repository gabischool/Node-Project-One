// Initialize express app
import express from 'express';
//var bodyParser = require('body-parser')
import bodyParser from 'body-parser';
import { find, findById, insert, remove, update, } from "./users/model.js";
const app = express();
// GET ALL USERS
app.use(bodyParser.json());
//app.use(express.json());
app.get('/api/find', async (req, res) => {
    const allUsers = await find();
    res.json(allUsers)
});
// GET USER BY ID
app.get('/api/find/:id', async (req, res) => {
    const user = await findById(req.params.id)
    if(user) {
        res.json(user);
    }else{
        res.status(404).json({massege: 'invalid id'});
    }
});
// CREATE A NEW USER
app.post('/api/find/add', async (req, res) => {
    const newUser = insert(req.body);

    if(newUser){
        res.json(newUser);
    }else{
        res.status(404).json({massege: 'invalid'});
    }
});
// UPDATE A USER
app.put('/api/find/update/:id', async (req, res) => {
    const updatedUser = await update(req.params.id, res.body);

    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: "invalid" });
    }
});
// DELETE A USER
app.delete('/api/find/delete/:id', async(req, res) =>{
    const deletedUser = await remove (req.params.id)
    if(deletedUser){
        res.json({massege : `user with id ${req.params.id} has done deleted`});
    }else{
        res.status(404);
    }
});
// export default app
export default app;
