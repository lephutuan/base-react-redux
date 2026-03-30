import React from "react";
class MyComponent extends React.Component {
  //State là một object, nó sẽ lưu trữ tất cả các giá trị mà component cần để render ra giao diện
  state = {
    name: "Le Phu Tuan",
    age: 22,
    address: "Hue",
  };
  // handleClick = (event) => {
  //   console.log("click me");
  //   // console.log("My name is", this.state.name);
  //   //setState
  //   this.setState({
  //     name: "Tuan Le Phu",
  //     age: Math.floor(Math.random() * 100 + 1),
  //   });
  // };

  // handleMouseOver(event) {
  //   console.log(event.target);
  //   console.log(event);
  //   console.log("I am", this.state.age, " years old");
  // }
  handleOnChangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleOnSubmitForm = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name}, I am {this.state.age} years old, I am from{" "}
        {this.state.address}
        <div>
          {/* <button onClick={this.handleClick}>Click me</button> */}
          <form onSubmit={(event) => this.handleOnSubmitForm(event)}>
            <input
              type="text"
              onChange={(event) => this.handleOnChangeInput(event)}
            />
            <button>Submit</button>
          </form>
          <br></br>
          {/* <button
            onMouseOver={(event) => {
              this.handleMouseOver(event);
            }}
          >
            Hover
          </button> */}
        </div>
      </div>
    );
  }
}

export default MyComponent;
