import React, { useState, useEffect } from "react";
import S from "./StyledComponent";

type ToastProps = {
  children: React.ReactNode;
};

export const SuccessToastComponent: React.FC<ToastProps> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <S.SuccessToast visible={visible}>{children}</S.SuccessToast>;
};

export const FailToastComponent: React.FC<ToastProps> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <S.FailToast visible={visible}>{children}</S.FailToast>;
};
