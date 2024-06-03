import { deleteCartItems, getCartItems, postCartItems } from "../api/cartItems";
import { useEffect, useState } from "react";

import { CartItem } from "../types/cartItems";

export interface ToggleCartItemReturns {
  cartItems: CartItem[];
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  checkSelected: (id: number) => boolean;
  isLoading: boolean;
  error: unknown;
}

const useToggleCartItem = (): ToggleCartItemReturns => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchCartItems = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const data = await getCartItems();
      setCartItems(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (productId: number) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await postCartItems({ productId, quantity: 1 });
      await fetchCartItems();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const targetCartItemIndex = cartItems.findIndex((item) => item.product.id === productId);
      const targetCartItemId = cartItems[targetCartItemIndex].id;
      await deleteCartItems(targetCartItemId);
      setCartItems((cartItems) => {
        const newCartItems = cartItems.filter((cartItem) => cartItem.id !== targetCartItemId);
        return newCartItems;
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkSelected = (id: number) => !!cartItems.find((item) => item.product.id === id);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    checkSelected,
    isLoading,
    error,
  };
};

export default useToggleCartItem;
