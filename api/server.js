// Initialize express app
import express from 'express'
import cors from 'cors'
import {find, findById, insert, update, remove} from './users/model.js'
import bodyParser from 'body-parser';



// GET ALL USER
const app = express();
app.use(cors())


// GET USER BY ID
app.use(bodyParser.json())


// CREATE A NEW USER
// GET ALL USERS - GET
app.get("/api/users", async (req, res) => {
    const allUsers = await find();
    res.json(allUsers)
})





// UPDATE A USER
// GET USER BY ID -GET 
app.get("/api/users/:id", async (req, res) => {
    const user = await findById(req.params.id);
    if(user) {
        res.json(user)
    } else {
        res.status(404).json({ status: 404, message: "User not found" })
    }
})








// DELETE A USER
// CREATE A NEW USER - POST 

app.post('/api/users/create_user', async (req, res) => {
    const newUser = await insert(req.body);
    if(newUser) {
        res.json(newUser);
    } else {
        res.status(400).json({ status: 400, message: "User was not created!" })
    }
})

// DELETE A USER - DELETE 
app.delete('/api/users/delete_user/:id', async (req, res) => {
    const deletedUser = await remove(req.params.id);
    if(deletedUser) {
        res.json({ status: 200, message: `User deleted id ${req.params.id} successfully` })
    } else {
        res.status(400).json({ status: 400, message: "User was not deleted" })
    }
})


// export default app
export default app;
