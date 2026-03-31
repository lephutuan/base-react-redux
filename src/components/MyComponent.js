import React from "react";
import AddUserInfo from "./AddUserInfo";
import MyInfo from "./MyInfo";
class MyComponent extends React.Component {
  //State là một object, nó sẽ lưu trữ tất cả các giá trị mà component cần để render ra giao diện
  state = {
    listUsers: [
      { id: 1, name: "Tuan", age: 20 },
      { id: 2, name: "Le", age: 21 },
      { id: 3, name: "Phu", age: 52 },
    ],
  };
  handleAddUser = (userObj) => {
    this.setState({
      listUsers: [userObj, ...this.state.listUsers],
    });
  };
  render() {
    // const myInfo = ["ab", "a", "cd"];
    return (
      <div>
        <AddUserInfo handleAddUser={this.handleAddUser} />
        <MyInfo listUsers={this.state.listUsers} />
      </div>
    );
  }
}

export default MyComponent;
