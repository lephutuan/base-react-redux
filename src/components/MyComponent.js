import React from "react";
import UserInfo from "./UserInfo";
import MyInfo from "./MyInfo";
class MyComponent extends React.Component {
  //State là một object, nó sẽ lưu trữ tất cả các giá trị mà component cần để render ra giao diện

  render() {
    const myInfo = ["ab", "a", "cd"];
    return (
      <div>
        <UserInfo />
        <MyInfo name="Heo" age={8} myInfo={myInfo} /><hr></hr>
        <MyInfo name="HeoHeo" age={88}  />
      </div>
    );
  }
}

export default MyComponent;
