// Initialize express app
import express from "express";

//import bodyParser from 'body-parser'
import { find, findById, insert, update, remove } from "./users/model.js";
//const users  = require('./model.js')
const app = express();
app.use(express.json());
// GET ALL USERS

app.get("/api/users", async (req, res) => {
  const allUsers = await find();
  if (!allUsers) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  } else {
    res.json(allUsers);
  }
});

// GET USER BY ID
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await findById(id);
    if (!user) {
      res
        .status(404)
        .send({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(user);
    }
  } catch {
    res
      .status(500)
      .send({ message: "The user information could not be retrieved" });
  }
});

// CREATE A NEW USER
app.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  }

  try {
    const newUser = await insert({ name, bio });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "There was an error while saving the user to the database",
      });
  }
});

// UPDATE A USER
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  }

  try {
    const updatedUser = await update(id, { name, bio });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

// DELETE A USER
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }

    await remove(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "The user could not be removed" });
  }
});

// export default app

export default app;
