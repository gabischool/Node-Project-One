// Initialize express app
import express from "express";
// Inistalling cors
import cors from "cors";
import { find, findById, insert, update, remove } from "./users/model.js";
// Installing BodyParser
import bodyParser from "body-parser";

const app = express();
app.use(cors());

app.use(bodyParser.json());

// GET ALL USERS - GET
app.get("/api/users", async (req, res) => {
  const AllUsers = await find();
  res.json(AllUsers);
});

// GET USER BY ID - GET
app.get("/api/users/:id", async (req, res) => {
  const SingalUser = await findById(req.params.id);
  if (SingalUser) {
    res.json(SingalUser);
  } else {
    res.status(404).json({ status: 404, message: "That User not found" });
  }
});

// CREATE A NEW USER - POST
app.post("/api/users/create_user", async (req, res) => {
  const CreatingNewUser = await insert(req.body);
  if (CreatingNewUser) {
    res.json(CreatingNewUser);
  } else {
    res.status(400).json({ status: 400, message: "User was not created!" });
  }
});

// UPDATE A USER - PUT
app.put("/api/users/update_user/:id", async (req, res) => {
  const UpdateUser = await update(req.params.id, req.body);
  if (UpdateUser) {
    res.json(UpdateUser);
  } else {
    res.status(400).json({ status: 400, message: "User was not updated" });
  }
});

// DELETE A USER - DELETE
app.delete("/api/users/delete_user/:id", async (req, res) => {
  const deletedUser = await remove(req.params.id);
  if (deletedUser) {
    res.json({
      status: 200,
      message: `User deleted id ${req.params.id} successfully`,
    });
  } else {
    res.status(400).json({ status: 400, message: "User was not deleted" });
  }
});

// export default app
export default app;
