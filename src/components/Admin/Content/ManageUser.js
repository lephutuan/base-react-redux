import CreateUserModal from "./CreateUserModal";


const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button>Add New User</button>
          <CreateUserModal />
        </div>
        <div>Table users</div>
      </div>
    </div>
  );
};
export default ManageUser;
