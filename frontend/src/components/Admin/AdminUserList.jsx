const AdminUserList = ({ users }) => (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{user.name}</h3>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  export default AdminUserList;
  