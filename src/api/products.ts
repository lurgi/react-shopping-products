import { ERROR_MESSAGE } from "../constants/errorMessage/ko";
import {
  PRODUCT_DEFAULT_CATEGORY,
  PRODUCT_DEFAULT_SORT,
  PRODUCT_SORT_LIST,
  PRODUCT_CATEGORY_LIST,
} from "../constants/mallData";

import { PRODUCTS_ENDPOINT } from "./endPoint";
import { fetchWithToken } from "./fetchWithToken";

interface GetProductsParams {
  page: number;
  size: number;
  category: (typeof PRODUCT_CATEGORY_LIST)[keyof typeof PRODUCT_CATEGORY_LIST];
  sort: (typeof PRODUCT_SORT_LIST)[keyof typeof PRODUCT_SORT_LIST];
}
export async function getProducts({ page, size, category, sort }: GetProductsParams) {
  let url = `${PRODUCTS_ENDPOINT}?page=${page}&size=${size}`;

  if (category !== PRODUCT_DEFAULT_CATEGORY) {
    url += `&category=${encodeURIComponent(category as string)}`;
  }

  if (sort !== PRODUCT_DEFAULT_SORT) {
    url += `&sort=price%2C${encodeURIComponent(sort as string)}`;
  }

  const data = await fetchWithToken({
    url,
    errorMessage: ERROR_MESSAGE.getProducts,
  });

  return data;
}
