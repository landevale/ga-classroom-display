import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // User State
  const [user, setUser] = useState({
    data: null,
    error: null,
    loading: true,
  });

  // On re-render, state resets, so we fetch user state again
  const fetchUser = async (info) => {
    try {
      const { data: response } = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (response.data.user) {
        setUser({
          data: {
            username: response.data.user.username,
            email: response.data.user.email,
          },
          error: null,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data.error);
      return setUser({
        data: null,
        error: error.response.data.error,
        loading: false,
      });
    }
  };

  //   useEffect(() => {
  //     if (token) {
  //       fetchUser();
  //     } else {
  //       setUser({
  //         data: null,
  //         error: null,
  //         loading: false,
  //       });
  //     }
  //   }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
