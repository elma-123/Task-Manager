const express = require("express");
const fs = require("fs");

const router = express.Router();

const auth =
require("../middleware/auth");

router.get(
  "/my-tasks",
  auth,
  (req, res) => {

    const tasks = JSON.parse(
      fs.readFileSync(
        "./data/taskdata.json"
      )
    );

    const myTasks =
      tasks.filter(
        task =>
        task.userId ==
        req.user.id
      );

    res.json(myTasks);

  }
);



router.put(
  "/complete-task/:id",
  auth,
  (req, res) => {

    const tasks = JSON.parse(
      fs.readFileSync(
        "./data/taskdata.json"
      )
    );

    const task =
      tasks.find(
        t =>
        t.taskId ==
        req.params.id
      );

    if (!task) {

      return res.status(404).json({
        message: "Task Not Found"
      });

    }

    task.status =
      "Completed";

    fs.writeFileSync(
      "./data/taskdata.json",
      JSON.stringify(
        tasks,
        null,
        2
      )
    );

    res.json({
      message:
      "Task Completed"
    });

  }
);

module.exports = router;