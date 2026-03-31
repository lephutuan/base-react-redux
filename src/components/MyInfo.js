import React, { useEffect, useState } from "react";
import "./MyInfo.scss";
import logo from "../logo.svg";
// class MyInfo extends React.Component {
//   render() {
//     //Destructuring
//     const { listUsers } = this.props;
//     return (
//       <div className="my-info-container">
//         {this.state.isShowHide === true && (
//           <div>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={+user.age > 20 ? "green" : "red"}>
//                   <div>Name: {user.name},</div>
//                   <div>Age: {user.age}</div>
//                   <button
//                     onClick={() => {
//                       this.props.handleDeleteUser(user.id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                   <hr></hr>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }
/**Stateless khi không cần state(quản lý trạng thái)
 * Stateful khi cần state(quản lý trạng thái)
 */
//React Hook
const MyInfo = (props) => {
  const { listUsers } = props;
  const [isShowHideListUser, setIsShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setIsShowHideListUser(!isShowHideListUser);
  };
  useEffect(() => {
    console.log("Use effect");
    if (listUsers.length === 0) {
      alert("List user is empty");
    }
  }, [listUsers]);
  console.log("Render");

  return (
    <div className="my-info-container">
      <div
        onClick={() => {
          handleShowHideListUser();
        }}
      >
        {isShowHideListUser === true ? "Hide List User" : "Show List User"}
      </div>
      {isShowHideListUser === true && (
        <div>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age > 20 ? "green" : "red"}>
                <div>Name: {user.name},</div>
                <div>Age: {user.age}</div>
                <button
                  onClick={() => {
                    props.handleDeleteUser(user.id);
                  }}
                >
                  Delete
                </button>
                <hr></hr>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MyInfo;
