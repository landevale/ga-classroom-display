import React, { useContext } from "react";
import { DataContext } from "../App";

const UserInfo = () => {
  const { user } = useContext(DataContext);

  return (
    <div>{user ? <p>Welcome, {user}</p> : <p>You are not logged in</p>}</div>
  );
};

export default UserInfo;
