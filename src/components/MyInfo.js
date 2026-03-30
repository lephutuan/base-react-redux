import React from "react";

class MyInfo extends React.Component {
  render() {
    console.log(this.props);
    //Destructuring
    const { name, age } = this.props;
    return (
      <div>
        My name is {this.props.name}
        <br></br>
        Age: {age}
      </div>
    );
  }
}
export default MyInfo;
