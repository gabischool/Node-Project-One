import express from "express";
import users from "./users/model";

// Initialize express app
const app = express();

// GET ALL USERS
app.get("/api/users/", async (req, res) => {
  const allUsers = await users.findAll();
  res.json(allUsers);
});

// GET USER BY ID
app.get("/api/users/:id", async (req, res) => {
  const User = await users.findById(req.params.id);
  res.json(User);
});

// CREATE A NEW USER

app.post("/api/users/", async (req, res) => {
  try {
    const newUser = await users.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE A USER

app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await users.updateUser(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE A USER

app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await users.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// export default app
export default app;
