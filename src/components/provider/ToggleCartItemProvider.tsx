import { PropsWithChildren, createContext } from "react";
import useToggleCartItem, { ToggleCartItemReturns } from "../../hooks/useToggleCartItem";

export const ToggleCartItemContext = createContext<ToggleCartItemReturns | null>(null);

export const ToggleCartItemProvider = ({ children }: PropsWithChildren) => {
  const { cartItems, addToCart, removeFromCart, checkSelected, isLoading, error } = useToggleCartItem();

  return (
    <ToggleCartItemContext.Provider value={{ cartItems, addToCart, removeFromCart, checkSelected, isLoading, error }}>
      {children}
    </ToggleCartItemContext.Provider>
  );
};
