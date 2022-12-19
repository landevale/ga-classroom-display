import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div>
      {user ? <p>Welcome, {user.username}</p> : <p>You are not logged in</p>}
    </div>
  );
};

export default UserInfo;
