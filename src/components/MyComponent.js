import React from "react";
import UserInfo from "./UserInfo";
class MyComponent extends React.Component {
  //State là một object, nó sẽ lưu trữ tất cả các giá trị mà component cần để render ra giao diện

  render() {
    return (
      <div>
        <UserInfo />
      </div>
    );
  }
}

export default MyComponent;
