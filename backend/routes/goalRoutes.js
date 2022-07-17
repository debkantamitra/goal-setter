const express = require("express");
const router = express.Router();
const {
  createGoals,
  readGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");

router.post("/", createGoals);
router.get("/", readGoals);
router.put("/:id", updateGoals);
router.delete("/:id", deleteGoals);

module.exports = router;
