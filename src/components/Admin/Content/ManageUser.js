import CreateUserModal from "./CreateUserModal";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus /> Add New User
          </button>
        </div>
        <div className="table-users-container">
          <TableUser></TableUser>
        </div>
      </div>
      <CreateUserModal
        show={showModalCreateUser}
        setShow={setShowModalCreateUser}
      />
    </div>
  );
};
export default ManageUser;
