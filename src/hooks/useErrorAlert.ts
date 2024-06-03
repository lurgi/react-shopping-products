import { useEffect } from "react";
import useCustomContext from "./useCustomContext";
import { ToastContext } from "../components/provider/ToastProvider";

interface UseErrorAlertProps {
  toggleCartItemError: unknown;
  productError: unknown;
}

const useErrorAlert = ({ toggleCartItemError, productError }: UseErrorAlertProps) => {
  const { failAlert } = useCustomContext(ToastContext);

  useEffect(() => {
    if (toggleCartItemError && toggleCartItemError instanceof Error) {
      failAlert(toggleCartItemError.message);
    }
  }, [toggleCartItemError]);

  useEffect(() => {
    if (productError && productError instanceof Error) {
      failAlert(productError.message);
    }
  }, [productError]);
};

export default useErrorAlert;
