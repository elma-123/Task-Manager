import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";

import apiService from "../services/apiService";

export default function UserDashboard() {

  const [tasks, setTasks] =
    useState([]);

  const loadTasks = async () => {

    try {

      const res =
        await apiService.get(
          "/user/my-tasks"
        );

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadTasks();

  }, []);

  const completeTask = async (id) => {

    try {

      await apiService.put(
        `/user/complete-task/${id}`
      );

      alert(
        "Task Completed"
      );

      loadTasks();

    } catch {

      alert(
        "Failed"
      );

    }

  };

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="dashboard">

          <h1>
            My Tasks
          </h1>

          <br />


    <div
  style={{
    background:"#16a34a",
    color:"white",
    padding:"25px",
    borderRadius:"12px",
    marginBottom:"20px"
  }}
>
  <h1>
    Welcome User
  </h1>

  <p>
    View assigned tasks and
    update completion status.
  </p>
</div>

<div className="cards">

  <StatsCard
    title="My Tasks"
    value={tasks.length}
  />

  <StatsCard
    title="Completed"
    value={
      tasks.filter(
        task =>
        task.status ===
        "Completed"
      ).length
    }
  />

</div>










          <div className="cards">

            {tasks.map((task) => (

              <div
                className="card"
                key={task.taskId}
              >

                <h3>
                  {task.title}
                </h3>

                <br />

                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "normal"
                  }}
                >
                  {task.description}
                </p>

                <br />

                <strong>
                  Status:
                </strong>

                <span
                  style={{
                    color:
                      task.status ===
                      "Completed"
                        ? "green"
                        : "orange"
                  }}
                >
                  {" "}
                  {task.status}
                </span>

                <br />
                <br />

                {task.status !==
                  "Completed" && (

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      completeTask(
                        task.taskId
                      )
                    }
                  >
                    Complete Task
                  </button>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}