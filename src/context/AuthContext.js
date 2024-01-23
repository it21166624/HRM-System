import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, login } from "../action/CANDIDATES/CandidateLogin";
import { useDispatch } from "react-redux";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (userProfle) {
      return JSON.parse(userProfle);
    }
    return null;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (phoneNumber) => {
    dispatch(login(phoneNumber, navigate));
  };

  const handleLogout = () => {
  };

  return (
    <>
      <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
