import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  let token;
  let role;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    role = localStorage.getItem("role");
  }
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
    if (role === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [token, role]);

  return (
    <MyContext.Provider value={{ isAdmin, setIsAdmin, isLogin, setIsLogin }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
