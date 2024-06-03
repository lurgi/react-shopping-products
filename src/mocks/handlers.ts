import { CART_ITEMS_ENDPOINT, PRODUCTS_ENDPOINT } from "../api/endPoint";
import { HttpResponse, http } from "msw";

import { CartMockClosure, isValidCartItemRequestBody } from "./handlerUtils";

import productsMockData from "./products.json";

export const cartMockClosure = CartMockClosure();

export const handlers = [
  http.get(PRODUCTS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || "1");
    const limit = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 5) * 4 + 20;
    const end = start + limit;

    const paginatedProducts = productsMockData.slice(start, end);

    const last = page === 24;

    return HttpResponse.json({ content: paginatedProducts, last });
  }),

  http.get(CART_ITEMS_ENDPOINT, () => HttpResponse.json(cartMockClosure.getCartMockData())),

  http.post(CART_ITEMS_ENDPOINT, async ({ request }) => {
    const body = await request.json();

    if (!isValidCartItemRequestBody(body)) {
      throw new Error("body로 주어진 값이 { productId, quantity} 형식이 아닙니다.");
    }

    cartMockClosure.pushCartItem(body);
    return HttpResponse.json({ status: 201 });
  }),

  http.delete(`${CART_ITEMS_ENDPOINT}/:id`, ({ params }) => {
    const { id } = params;
    const numberId = Number(id);

    if (Number.isNaN(numberId)) {
      throw new Error(`값이 숫자가 아닙니다.`);
    }

    cartMockClosure.deleteCartItem(numberId);
    return HttpResponse.json({ status: 204 });
  }),
];
