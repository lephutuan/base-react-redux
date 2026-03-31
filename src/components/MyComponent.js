import React, { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import MyInfo from "./MyInfo";
// class MyComponent extends React.Component {
//   //State là một object, nó sẽ lưu trữ tất cả các giá trị mà component cần để render ra giao diện
//   state = {
//     listUsers: [
//       { id: 1, name: "Tuan", age: 20 },
//       { id: 2, name: "Le", age: 21 },
//       { id: 3, name: "Phu", age: 52 },
//     ],
//   };
//   handleAddUser = (userObj) => {
//     this.setState({
//       listUsers: [userObj, ...this.state.listUsers],
//     });
//   };
//   handleDeleteUser = (userId) => {
//     let newListUSers = this.state.listUsers.filter(
//       (item) => item.id !== userId,
//     );
//     this.setState({
//       listUsers: newListUSers,
//     });
//   };
//   render() {
//     // const myInfo = ["ab", "a", "cd"];
//     return (
//       <div>
//         <AddUserInfo handleAddUser={this.handleAddUser} />
//         <MyInfo
//           listUsers={this.state.listUsers}
//           handleDeleteUser={this.handleDeleteUser}
//         />
//       </div>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "Tuan", age: 20 },
    { id: 2, name: "Le", age: 21 },
    { id: 3, name: "Phu", age: 52 },
  ]);
  const handleAddUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };
  const handleDeleteUser = (userId) => {
    let newListUSers = listUsers.filter((item) => item.id !== userId);
    setListUsers(newListUSers);
  };
  return (
    <div>
      <AddUserInfo handleAddUser={handleAddUser} />
      <MyInfo listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </div>
  );
};

export default MyComponent;
