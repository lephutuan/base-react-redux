import React from "react";
class MyComponent extends React.Component {
  //State là một object, nó sẽ lưu trữ tất cả các giá trị mà component cần để render ra giao diện
  state = {
    name: "Le Phu Tuan",
    age: 22,
    address: "Hue",
  };
  handleClick(event) {
    console.log("click me");
    console.log("My name is", this.state.name);
  }

  handleMouseOver(event) {
    console.log(event.target);
    console.log(event);
  }

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name}, I am {this.state.age} years old, I am from{" "}
        {this.state.address}
        <div>
          <button onClick={this.handleClick}>Click me</button>
          <br></br>
          <button onMouseOver={this.handleMouseOver}>Hover</button>
        </div>
      </div>
    );
  }
}

export default MyComponent;
