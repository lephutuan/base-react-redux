import React from "react";

class AddUserInfo extends React.Component {
  state = {
    name: "",
    age: "",
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
  handleOnChangeAge = (event) => {
    this.setState({
      age: event.target.value,
    });
  };

  handleOnSubmitForm = (event) => {
    event.preventDefault();
    this.props.handleAddUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
  };
  //JSX
  render() {
    return (
      //fragment <></> OR <React.Fragment></React.Fragment>
      //  -> khong phai tuan thu viec can 1 div bao quanh
      <>
        My name is {this.state.name}, I am {this.state.age} years old
        <div>
          {/* <button onClick={this.handleClick}>Click me</button> */}
          <form onSubmit={(event) => this.handleOnSubmitForm(event)}>
            <label>Name:</label>
            <input
              value={this.state.name}
              type="text"
              onChange={(event) => this.handleOnChangeInput(event)}
            />
            <label>Age:</label>
            <input
              value={this.state.age}
              type="text"
              onChange={(event) => this.handleOnChangeAge(event)}
            />
            <button>Submit</button>
          </form>
        </div>
      </>
    );
  }
}
export default AddUserInfo;
