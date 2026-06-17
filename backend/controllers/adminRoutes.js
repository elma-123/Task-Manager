const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");

const router = express.Router();

const auth = require("../middleware/auth");


// Test Admin Route
router.get(
  "/test",
  auth,
  (req, res) => {
    res.json({
      message: "Admin Authorized",
      user: req.user
    });
  }
);


// Create User
router.post(
  "/create-user",
  auth,
  async (req, res) => {
    try {

      const {
        id,
        name,
        email,
        password
      } = req.body;

      if (!id || !name || !email || !password) {
        return res.status(400).json({
          message: "All fields are required"
        });
      }

      const users = JSON.parse(
        fs.readFileSync(
          "./data/userdata.json",
          "utf-8"
        )
      );

      const existingUser = users.find(
        (user) =>
          user.id == id ||
          user.email === email
      );

      if (existingUser) {
        return res.status(400).json({
          message:
            "User ID or Email already exists"
        });
      }

      const hash = await bcrypt.hash(
        password,
        10
      );

      const newUser = {
        id,
        name,
        email,
        password: hash,
        role: "user"
      };

      users.push(newUser);

      fs.writeFileSync(
        "./data/userdata.json",
        JSON.stringify(
          users,
          null,
          2
        )
      );

      res.status(201).json({
        message: "User Created Successfully",
        user: {
          id,
          name,
          email,
          role: "user"
        }
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
        error: error.message
      });

    }
  }
);


// Get All Users
router.get(
  "/users",
  auth,
  (req, res) => {
    try {

      const users = JSON.parse(
        fs.readFileSync(
          "./data/userdata.json",
          "utf-8"
        )
      );

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
        error: error.message
      });

    }
  }
);


// Update User
router.put(
  "/update-user/:id",
  auth,
  async (req, res) => {

    try {

      const users = JSON.parse(
        fs.readFileSync(
          "./data/userdata.json",
          "utf-8"
        )
      );

      const userIndex = users.findIndex(
        user => user.id == req.params.id
      );

      if (userIndex === -1) {

        return res.status(404).json({
          message: "User Not Found"
        });

      }

      users[userIndex].name =
        req.body.name ||
        users[userIndex].name;

      users[userIndex].email =
        req.body.email ||
        users[userIndex].email;

      fs.writeFileSync(
        "./data/userdata.json",
        JSON.stringify(
          users,
          null,
          2
        )
      );

      res.json({
        message: "User Updated Successfully",
        user: users[userIndex]
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
        error: error.message
      });

    }

  }
);


// Delete User
router.delete(
  "/delete-user/:id",
  auth,
  (req, res) => {

    try {

      const users = JSON.parse(
        fs.readFileSync(
          "./data/userdata.json",
          "utf-8"
        )
      );

      const filteredUsers =
        users.filter(
          user =>
            user.id != req.params.id
        );

      fs.writeFileSync(
        "./data/userdata.json",
        JSON.stringify(
          filteredUsers,
          null,
          2
        )
      );

      res.json({
        message:
          "User Deleted Successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: "Server Error",
        error: error.message
      });

    }

  }
);





router.post(
  "/assign-task",
  auth,
  (req, res) => {

    const {
      taskId,
      title,
      description,
      userId
    } = req.body;

    const tasks = JSON.parse(
      fs.readFileSync(
        "./data/taskdata.json"
      )
    );

    const newTask = {

      taskId,
      title,
      description,
      userId,

      status: "Pending"

    };

    tasks.push(newTask);

    fs.writeFileSync(
      "./data/taskdata.json",
      JSON.stringify(
        tasks,
        null,
        2
      )
    );

    res.status(201).json({

      message:
      "Task Assigned Successfully",

      task: newTask

    });

  }
);



router.get(
  "/tasks",
  auth,
  (req, res) => {

    const tasks = JSON.parse(
      fs.readFileSync(
        "./data/taskdata.json"
      )
    );

    res.json(tasks);

  }
);


router.get(
  "/search-user",
  auth,
  (req, res) => {

    const { query } = req.query;

    const users = JSON.parse(
      fs.readFileSync(
        "./data/userdata.json"
      )
    );

    const result = users.filter(
      user =>
        user.name
          .toLowerCase()
          .includes(query.toLowerCase()) ||

        user.email
          .toLowerCase()
          .includes(query.toLowerCase()) ||

        String(user.id)
          .includes(query)
    );

    res.json(result);

  }
);


router.get(
  "/stats",
  auth,
  (req, res) => {

    const users = JSON.parse(
      fs.readFileSync(
        "./data/userdata.json"
      )
    );

    const tasks = JSON.parse(
      fs.readFileSync(
        "./data/taskdata.json"
      )
    );

    const pendingTasks =
      tasks.filter(
        task =>
        task.status === "Pending"
      ).length;

    const completedTasks =
      tasks.filter(
        task =>
        task.status === "Completed"
      ).length;

    const normalUsers = users.filter(
  user => user.role !== "admin"
);

res.json({
  totalUsers: normalUsers.length,
  totalTasks: tasks.length,
  pendingTasks,
  completedTasks
});

  }
);


router.put(
  "/update-task/:id",
  auth,
  (req, res) => {

    const tasks = JSON.parse(
      fs.readFileSync("./data/taskdata.json")
    );

    const task = tasks.find(
      t => t.taskId == req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found"
      });
    }

    task.title =
      req.body.title || task.title;

    task.description =
      req.body.description ||
      task.description;

    task.userId =
      req.body.userId || task.userId;

    fs.writeFileSync(
      "./data/taskdata.json",
      JSON.stringify(tasks, null, 2)
    );

    res.json({
      message: "Task Updated",
      task
    });

  }
);



router.delete(
  "/delete-task/:id",
  auth,
  (req, res) => {

    const tasks = JSON.parse(
      fs.readFileSync("./data/taskdata.json")
    );

    const filteredTasks =
      tasks.filter(
        task =>
        task.taskId != req.params.id
      );

    fs.writeFileSync(
      "./data/taskdata.json",
      JSON.stringify(filteredTasks, null, 2)
    );

    res.json({
      message: "Task Deleted"
    });

  }
);



router.get(
  "/search-task",
  auth,
  (req, res) => {

    const { query } = req.query;

    const tasks = JSON.parse(
      fs.readFileSync("./data/taskdata.json")
    );

    const result =
      tasks.filter(task =>

        task.title
          .toLowerCase()
          .includes(query.toLowerCase())

        ||

        String(task.taskId)
          .includes(query)

        ||

        String(task.userId)
          .includes(query)

      );

    res.json(result);

  }
);

module.exports = router;