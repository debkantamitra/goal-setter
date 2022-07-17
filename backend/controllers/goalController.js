const Goal = require("../model/goalModel");

const createGoals = async (req, res) => {
  try {
    if (!req.body.text) {
      res.status(400);

      throw new Error("Please add a textfiled");
    }

    const response = await Goal.create({
      text: req.body.text,
    });

    res.status(201);
    res.json({ message: "created successfully", data: response });
  } catch (e) {
    console.log(e);
  }
};
const readGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});

    res.status(200);
    res.json({ message: "success", data: goals });
  } catch (e) {
    console.log(e);
  }
};
const updateGoals = async (req, res) => {
  try {
    if (!req.params.id || !req.body.text) {
      res.status(400);

      throw new Error("bad request");
    }

    const data = await Goal.findByIdAndUpdate(req.params.id, req.body);

    res.status(200);
    res.json({ message: "successfully updated!", data: data });
  } catch (e) {
    console.log(e);
  }
};
const deleteGoals = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400);

      throw new Error("bad request");
    }

    const data = await Goal.findByIdAndDelete(req.params.id);

    res.status(200);
    res.json({ message: "successfully deleted!", data: data });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createGoals,
  readGoals,
  updateGoals,
  deleteGoals,
};
