import React, { useState, createContext } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import endPoints from "services/api";

export const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
}

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

function useProviderAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password, setErrorLogin) => {
    try {
      const options = {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        endPoints.auth.login,
        {
          email: email,
          password: password,
        },
        options
      );

      console.log(data);
      if (data.access_token) {
        setErrorLogin(false);
        const token = data.access_token;
        const oneHour = 1 / 24;
        Cookie.set("token", token, { expires: oneHour });

        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(endPoints.auth.profile);
        console.log(response.data);
        setUser(response.data);
      }
    } catch {
      setErrorLogin(true);
    }
  };

  const refreshSession = async () => {
    const token = Cookie.get("token");

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const response = await axios.get(endPoints.auth.profile);
      setUser(response.data);
    }
  };

  const logout = () => {
    Cookie.remove("token");
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = "/login";
  };

  return {
    user,
    signIn,
    refreshSession,
    logout,
  };
}
