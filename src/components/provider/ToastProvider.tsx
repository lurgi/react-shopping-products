import React, { createContext, useState, ReactNode } from "react";
import { SuccessToastComponent, FailToastComponent } from "../common/Toasts";

type ToastContextType = {
  failAlert: (message: string) => void;
  successAlert: (message: string) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastList, setToastList] = useState<{ id: number; type: "success" | "fail"; message: string }[]>([]);
  const [nextId, setNextId] = useState(0);

  const removeToast = (id: number) => {
    setToastList((prev) => prev.filter((toast) => toast.id !== id));
  };

  const failAlert = (message: string) => {
    const id = nextId;
    setToastList((prev) => [...prev, { id, type: "fail", message }]);
    setNextId(nextId + 1);

    setTimeout(() => removeToast(id), 4000);
  };

  const successAlert = (message: string) => {
    const id = nextId;
    setToastList((prev) => [...prev, { id, type: "success", message }]);
    setNextId(nextId + 1);

    setTimeout(() => removeToast(id), 4000);
  };

  return (
    <ToastContext.Provider value={{ failAlert, successAlert }}>
      {toastList.map((toast) => {
        if (toast.type === "success") {
          return <SuccessToastComponent key={toast.id}>{toast.message}</SuccessToastComponent>;
        } else {
          return <FailToastComponent key={toast.id}>{toast.message}</FailToastComponent>;
        }
      })}
      {children}
    </ToastContext.Provider>
  );
};
