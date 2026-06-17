export default function TaskTable({
  tasks,
  deleteTask,
  setEditTaskId,
  setEditTitle,
  setEditDescription,
  setEditUserId,
}) {

  return (

    <div className="table-container">

      <h2>Task List</h2>

      <table>

        <thead>

          <tr>

            <th>Task ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr key={task.taskId}>

              <td>{task.taskId}</td>

              <td>{task.title}</td>

              <td>{task.description}</td>

              <td>{task.userId}</td>

              <td>{task.status}</td>

              <td>


                <button
  className="btn btn-primary"
  style={{
    marginRight: "10px"
  }}
  onClick={() => {

    setEditTaskId(task.taskId);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditUserId(task.userId);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }}
>
  Edit
</button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    deleteTask(task.taskId)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}