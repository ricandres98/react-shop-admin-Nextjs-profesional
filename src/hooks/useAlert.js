import { useState } from "react";

const useAlert = (options) => {
  const defaultOptions = {
    active: false,
    message: "",
    type: "",
    autoClose: true,
  };

  const [alert, setAlert] = useState({
    ...defaultOptions,
    ...options,
  });

  const toggleAlert = () => {
    setAlert((prev) => {
      return {
        ...prev,
        active: false,
      };
    });
  };

  return {
    alert,
    setAlert,
    toggleAlert,
  };
};

export { useAlert };
