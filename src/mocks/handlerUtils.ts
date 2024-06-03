import { CartItem } from "../types/cartItems";
import cartItemMockData from "./cartItems.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidCartItemRequestBody(value: any): value is CartItem {
  if (
    !value ||
    typeof value !== "object" ||
    typeof value.productId !== "number" ||
    typeof value.quantity !== "number"
  ) {
    return false;
  }
  return true;
}

export function CartMockClosure() {
  let cartMockData = JSON.parse(JSON.stringify(cartItemMockData));

  const getCartMockData = () => {
    return cartMockData;
  };

  const pushCartItem = (mockCartItem: CartItem) => {
    cartMockData.content = [...cartMockData.content, mockCartItem];
  };

  const deleteCartItem = (id: number) => {
    cartMockData.content = cartMockData.content.filter((el: CartItem) => el.id !== id);
  };

  const resetCartItems = () => {
    cartMockData = JSON.parse(JSON.stringify(cartItemMockData));
  };

  return { getCartMockData, pushCartItem, deleteCartItem, resetCartItems };
}
