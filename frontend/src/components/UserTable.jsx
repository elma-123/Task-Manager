export default function UserTable({
  users,
  deleteUser,
  setEditId,
  setEditName,
  setEditEmail,
}) {

  return (

    <div className="table-container">

      <h2>User List</h2>

      <table>

        <thead>

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>

  <button
    className="btn btn-primary"
    style={{
      marginRight: "10px"
    }}
    onClick={() => {

      setEditId(user.id);
      setEditName(user.name);
      setEditEmail(user.email);

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
      deleteUser(user.id)
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