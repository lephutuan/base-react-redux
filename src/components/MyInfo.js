import React from "react";

class MyInfo extends React.Component {
  render() {
    //Destructuring
    const { listUsers } = this.props;
    return (
      <div>
        {listUsers.map((user) => {
          return (
            <div key={user.id}>
              <div>Name: {user.name},</div>
              <div>Age: {user.age}</div>
              <hr></hr>
            </div>
          );
        })}
      </div>
    );
  }
}
export default MyInfo;
