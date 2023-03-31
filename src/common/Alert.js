import { XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

export const Alert = ({ alert, handleClose }) => {
  useEffect(() => {
    if (alert && alert?.autoClose) {
      setTimeout(() => {
        handleClose();
      }, 5000);
    }
  }, [alert.active, alert]);

  return (
    <>
      {alert?.active && (
        <div className="bg-indigo-100 p-5 w-full rounded mb-8">
          <div className="flex space-x-3">
            <div className="flex-1 leading-tight text-sm text-black font-medium">
              {alert.message}
            </div>
            <button type="button">
              <XCircleIcon
                className="w-6 h-6 text-gray-600"
                onClick={handleClose}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
