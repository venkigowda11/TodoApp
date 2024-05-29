const express = require("express");
const mongoose = require("mongoose");
const listModel = require("../server/models/list");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cors());

app.listen(4000, () => {
  console.log("server running");
});

mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

app.post("/add", (req, res) => {
  const { todo } = req.body;
  const resp = new listModel({ name: todo });
  resp.save();
  res.json("Success");
});

app.get("/getTodos", async (req, res) => {
  try {
    const allTodo = await listModel.find({});
    res.status(200).json(allTodo);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await listModel.findByIdAndDelete(id);
    if (resp) {
      res.json("sucess");
    } else {
      res.json("Failed");
    }
  } catch (error) {
    console.log(error);
  }
});

app.patch("/updateTodo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { todoStatus } = req.body;
    const update = await listModel.findByIdAndUpdate(id, {
      status: !todoStatus,
    });
    if (update) {
      res.json("success");
    } else {
      res.json("Nat able to update");
    }
  } catch (err) {
    console.log(err);
  }
});
