import express from "express";
import { find, findById, insert, remove, update } from "./users/model.js";
// Initialize express app
const app = express();
// Middle ware or bodyparser
app.use(express.json());
// GET ALL USERS
app.get("/api/users/", async (req, res) => {
  try {
    const allUsers = await find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(404).json({ status: false, message: "Not Found" });
  }
});
// GET USER BY ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findById(id);
    if (user) {
      // console.log(id)
      res.status(200).json(user);
    } else {
      res.status(400).json({ status: false, message: "NOT FOUND" });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "THIS URL IS NOT FOUND" });
  }
});
// CREATE A NEW USER
app.post("/api/users/create-user", async (req, res) => {
  const body = req.body;
 try{
     const createdUser = await insert(body);
  if (createdUser) {
    res
      .status(200)
      .json({ status: true, message: "Successfully Created User.✔" });
  } else {
    res.status(404).json({ status: true, message: "Filed to create user❌" });
  }
 }catch(err){
    res.status(500).json({ status: false, message: "NOT FOUND" });
 }
 
});

// UPDATE A USER
app.put('/api/users/update-user/:id', async(req, res) =>{
    const {id} = req.params;
    const body = req.body;

    try{
        const updatedUser = await update(id, body)
        if(updatedUser){
            res.status(200).json({status: true, message: "Successfully Updated This User✔"})
        }else{
            res.status(200).json({status: true, message: "Not FOUND.❌"})
        }
    }catch(err){
        res.status(500).json({status:false, message: err});
    }
})

// DELETE A USER

app.delete('/api/users/delete-user/:id', async(req, res) =>{
    const {id} = req.params;
    const deletedUser = await remove(id);
    if(deletedUser){
        res.status(200).json({status: true, message: "Succsfully Deleted The User..✔"})
    }else{
        res.status(500).json({status: true, message: "Not Deleted.❌"})
    }
})

// export default app
export default app;
