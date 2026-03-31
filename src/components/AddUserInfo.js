import React, { useState } from "react";

// class AddUserInfo extends React.Component {
//   state = {
//     name: "",
//     age: "",
//   };
//   handleOnChangeInput = (event) => {
//     this.setState({
//       name: event.target.value,
//     });
//   };
//   handleOnChangeAge = (event) => {
//     this.setState({
//       age: event.target.value,
//     });
//   };

//   handleOnSubmitForm = (event) => {
//     event.preventDefault();
//     this.props.handleAddUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   //JSX
//   render() {
//     return (
//       //fragment <></> OR <React.Fragment></React.Fragment>
//       //  -> khong phai tuan thu viec can 1 div bao quanh
//       <>
//         My name is {this.state.name}, I am {this.state.age} years old
//         <div>
//           {/* <button onClick={this.handleClick}>Click me</button> */}
//           <form onSubmit={(event) => this.handleOnSubmitForm(event)}>
//             <label>Name:</label>
//             <input
//               value={this.state.name}
//               type="text"
//               onChange={(event) => this.handleOnChangeInput(event)}
//             />
//             <label>Age:</label>
//             <input
//               value={this.state.age}
//               type="text"
//               onChange={(event) => this.handleOnChangeAge(event)}
//             />
//             <button>Submit</button>
//           </form>
//         </div>
//       </>
//     );
//   }
// }
const AddUserInfo = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const handleOnChangeInput = (event) => {
    setName(event.target.value);
  };
  const handleOnChangeAge = (event) => {
    setAge(event.target.value);
  };

  const handleOnSubmitForm = (event) => {
    event.preventDefault();
    props.handleAddUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };
  return (
    <>
      My name is {name}, I am {age} years old
      <div>
        <form onSubmit={(event) => handleOnSubmitForm(event)}>
          <label>Name:</label>
          <input
            value={name}
            type="text"
            onChange={(event) => handleOnChangeInput(event)}
          />
          <label>Age:</label>
          <input
            value={age}
            type="text"
            onChange={(event) => handleOnChangeAge(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};
export default AddUserInfo;
