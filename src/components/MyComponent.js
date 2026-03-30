import React from "react";
class MyComponent extends React.Component {
  //State là một object, nó sẽ lưu trữ tất cả các giá trị mà component cần để render ra giao diện
  state = {
    name: "Le Phu Tuan",
    age: 22,
    address: "Hue",
  };
  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name}, I am {this.state.age} years old, I am
        from {this.state.address}
      </div>
    );
  }
}

export default MyComponent;
