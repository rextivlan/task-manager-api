const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

// Route to create task
router.post("/tasks", auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route to get all tasks
// Get /tasks?completed=true
// Get /tasks?limit=10&skip=20
// Get /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  try {
    //const tasks = await Task.find({});
    //Using Populate not working
    // await req.user
    //   .populate({
    //     path: "tasks",
    //     match,
    //     options: {
    //       limit: req.query.limit,
    //       skip: req.query.skip,
    //       sort: {
    //             createdAt: 1/-1 {1:Ascending, -1:Descending }
    //      }
    //     },
    //   })
    //   .execPopulate();
    var match;
    const limitValue = parseInt(req.query.limit);
    const skipValue = parseInt(req.query.skip);
    const mySort = {};

    if (req.query.completed) {
      match = req.query.completed === "true";
      const tasks = await Task.find({
        owner: req.user._id,
        completed: match,
      });
      res.send(tasks);
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      mySort[parts[0]] = parts[1] === "desc" ? -1 : 1;

      const tasks = await Task.find({ owner: req.user._id }).sort(mySort);
      res.send(tasks);
    }

    const tasks = await Task.find({ owner: req.user._id })
      .limit(limitValue)
      .skip(skipValue);
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Route to get task by ID
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(400).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Route to update a task
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(400).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Route to delete a task
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    //const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      res.status(404).send({ error: "Invalid Task" });
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
