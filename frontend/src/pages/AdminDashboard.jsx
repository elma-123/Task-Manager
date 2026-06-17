import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import UserTable from "../components/UserTable";
import TaskTable from "../components/TaskTable";

import apiService from "../services/apiService";

export default function AdminDashboard() {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");
  const [taskSearch, setTaskSearch] = useState("");


const [editTaskId, setEditTaskId] = useState("");
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");
const [editUserId, setEditUserId] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const [editId, setEditId] = useState("");
const [editName, setEditName] = useState("");
const [editEmail, setEditEmail] = useState("");

  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });

  const loadUsers = async () => {

    try {

      const res =
        await apiService.get(
          "/admin/users"
        );

      setUsers(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const loadTasks = async () => {

    try {

      const res =
        await apiService.get(
          "/admin/tasks"
        );

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const loadStats = async () => {

    try {

      const res =
        await apiService.get(
          "/admin/stats"
        );

      setStats(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const refreshData = () => {

    loadUsers();
    loadTasks();
    loadStats();

  };

  useEffect(() => {

    refreshData();

  }, []);

  const createUser = async () => {

    try {

      await apiService.post(
        "/admin/create-user",
        {
          id,
          name,
          email,
          password,
        }
      );

      alert("User Created Successfully");

      setId("");
      setName("");
      setEmail("");
      setPassword("");

      refreshData();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Error Creating User"
      );

    }

  };

  const deleteUser = async (id) => {

    try {

      await apiService.delete(
        `/admin/delete-user/${id}`
      );

      alert("User Deleted");

      refreshData();

    } catch {

      alert("Delete Failed");

    }

  };


  const updateUser = async () => {

  try {

    await apiService.put(
      `/admin/update-user/${editId}`,
      {
        name: editName,
        email: editEmail,
      }
    );

    alert("User Updated Successfully");

    setEditId("");
    setEditName("");
    setEditEmail("");

    refreshData();

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Update Failed"
    );

  }

};

  const assignTask = async () => {

    try {

      await apiService.post(
        "/admin/assign-task",
        {
          taskId,
          title,
          description,
          userId,
        }
      );

      alert("Task Assigned");

      setTaskId("");
      setTitle("");
      setDescription("");
      setUserId("");

      refreshData();

    } catch {

      alert("Task Assign Failed");

    }

  };

  const deleteTask = async (id) => {

    try {

      await apiService.delete(
        `/admin/delete-task/${id}`
      );

      refreshData();

    } catch {

      alert("Delete Failed");

    }

  };



  const updateTask = async () => {

  try {

    await apiService.put(
      `/admin/update-task/${editTaskId}`,
      {
        title: editTitle,
        description: editDescription,
        userId: editUserId,
      }
    );

    alert("Task Updated Successfully");

    setEditTaskId("");
    setEditTitle("");
    setEditDescription("");
    setEditUserId("");

    refreshData();

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Update Failed"
    );

  }

};

  const filteredUsers =
  users.filter(
    (user) =>
      user.role !== "admin" &&
      (
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        String(user.id)
          .includes(search)
      )
  );

  const filteredTasks =
    tasks.filter(
      (task) =>
        task.title
          ?.toLowerCase()
          .includes(
            taskSearch.toLowerCase()
          ) ||

        String(task.taskId)
          .includes(taskSearch)
    );

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="dashboard">

          <h1>
            Admin Dashboard
          </h1>

          <br />


<div
  style={{
    background:"#2563eb",
    color:"white",
    padding:"25px",
    borderRadius:"12px",
    marginBottom:"20px"
  }}
>
  <h1>
    Welcome Admin
  </h1>

  <p>
    Manage users, assign tasks
    and monitor progress.
  </p>
</div>




          <div className="cards">

            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
            />

            <StatsCard
              title="Total Tasks"
              value={stats.totalTasks}
            />

            <StatsCard
              title="Pending Tasks"
              value={stats.pendingTasks}
            />

            <StatsCard
              title="Completed Tasks"
              value={stats.completedTasks}
            />

          </div>

          <div className="table-container">

            <h2>Create User</h2>

            <br />

            <input
              placeholder="User ID"
              value={id}
              onChange={(e) =>
                setId(e.target.value)
              }
            />

            <br /><br />

            <input
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <br /><br />

            <input
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <br /><br />

            <input
              type="Enter Password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <br /><br />

            <button
              className="btn btn-success"
              onClick={createUser}
            >
              Create User
            </button>

            <button
              className="btn btn-primary"
              style={{
                marginLeft: "10px"
              }}
              onClick={refreshData}
            >
              Refresh
            </button>

          </div>

          <br />




  <div className="table-container">

  <h2>Update User</h2>

  <br />

  <input
    placeholder="User ID"
    value={editId}
    onChange={(e) =>
      setEditId(e.target.value)
    }
  />

  <br /><br />

  <input
    placeholder="New Name"
    value={editName}
    onChange={(e) =>
      setEditName(e.target.value)
    }
  />

  <br /><br />

  <input
    placeholder="New Email"
    value={editEmail}
    onChange={(e) =>
      setEditEmail(e.target.value)
    }
  />

  <br /><br />

  <button
    className="btn btn-warning"
    onClick={updateUser}
  >
    Update User
  </button>

</div>

<br />







          <input
            type="text"
            placeholder="Search User"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <br /><br />

          <UserTable
  users={filteredUsers}
  deleteUser={deleteUser}
  setEditId={setEditId}
  setEditName={setEditName}
  setEditEmail={setEditEmail}
/>

          <br />

          <div className="table-container">

            <h2>Assign Task</h2>

            <br />

            <input
              placeholder="Task ID"
              value={taskId}
              onChange={(e) =>
                setTaskId(
                  e.target.value
                )
              }
            />

            <br /><br />

            <input
              placeholder="Task Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

            <br /><br />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <br /><br />

            <input
              placeholder="User ID"
              value={userId}
              onChange={(e) =>
                setUserId(
                  e.target.value
                )
              }
            />

            <br /><br />

            <button
              className="btn btn-primary"
              onClick={assignTask}
            >
              Assign Task
            </button>

          </div>

          <br />

  <div className="table-container">

  <h2>Update Task</h2>

  <br />

  <input
    placeholder="Task ID"
    value={editTaskId}
    onChange={(e) =>
      setEditTaskId(e.target.value)
    }
  />

  <br /><br />

  <input
    placeholder="New Title"
    value={editTitle}
    onChange={(e) =>
      setEditTitle(e.target.value)
    }
  />

  <br /><br />

  <input
    placeholder="New Description"
    value={editDescription}
    onChange={(e) =>
      setEditDescription(e.target.value)
    }
  />

  <br /><br />

  <input
    placeholder="New User ID"
    value={editUserId}
    onChange={(e) =>
      setEditUserId(e.target.value)
    }
  />

  <br /><br />

  <button
    className="btn btn-warning"
    onClick={updateTask}
  >
    Update Task
  </button>

</div>

<br />



          <input
            type="text"
            placeholder="Search Task"
            value={taskSearch}
            onChange={(e) =>
              setTaskSearch(
                e.target.value
              )
            }
          />

          <br /><br />

          <TaskTable
  tasks={filteredTasks}
  deleteTask={deleteTask}
  setEditTaskId={setEditTaskId}
  setEditTitle={setEditTitle}
  setEditDescription={setEditDescription}
  setEditUserId={setEditUserId}
/>

        </div>

      </div>

    </div>

  );
}