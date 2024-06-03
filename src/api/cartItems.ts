import { ERROR_MESSAGE } from "../constants/errorMessage/ko";
import { CART_ITEMS_ENDPOINT } from "./endPoint";
import { fetchWithToken } from "./fetchWithToken";

export async function getCartItems() {
  const fetchCartItems = async (size?: number) =>
    await fetchWithToken({
      url: `${CART_ITEMS_ENDPOINT}?size=${size}`,
      errorMessage: ERROR_MESSAGE.getCartItems,
    });

  const { totalElements } = await fetchCartItems();
  const data = await fetchCartItems(totalElements);

  return data.content;
}

export async function getFirstCartItems() {}

export async function postCartItems(body: { productId: number; quantity: number }) {
  const data = await fetchWithToken({
    method: "POST",
    url: `${CART_ITEMS_ENDPOINT}`,
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify(body),
    errorMessage: ERROR_MESSAGE.postCartItems,
  });

  return data;
}

export async function deleteCartItems(id: number) {
  const data = await fetchWithToken({
    method: "DELETE",
    url: `${CART_ITEMS_ENDPOINT}/${id}`,
    errorMessage: ERROR_MESSAGE.deleteCartItems,
  });

  return data;
}
