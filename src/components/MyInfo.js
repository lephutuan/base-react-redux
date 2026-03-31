import React from "react";
import "./MyInfo.scss";
import logo from "../logo.svg";
class MyInfo extends React.Component {
  state = {
    isShowHide: true,
  };
  handleShowHide = () => {
    this.setState({
      isShowHide: !this.state.isShowHide,
    });
  };
  render() {
    //Destructuring
    const { listUsers } = this.props;
    return (
      <div className="my-info-container">
        <img src={logo} />
        <div>
          <p
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShowHide === true
              ? "Hide list users"
              : "Show list users"}
          </p>
        </div>
        {this.state.isShowHide === true && (
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={+user.age > 20 ? "green" : "red"}>
                  <div>Name: {user.name},</div>
                  <div>Age: {user.age}</div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default MyInfo;
