import { PRODUCT_CATEGORY_LIST, PRODUCT_SORT_LIST } from "../constants/mallData";

export type PRODUCT_CATEGORY_TYPE = (typeof PRODUCT_CATEGORY_LIST)[keyof typeof PRODUCT_CATEGORY_LIST];
export type PRODUCT_SORT_TYPE = (typeof PRODUCT_SORT_LIST)[keyof typeof PRODUCT_SORT_LIST];
