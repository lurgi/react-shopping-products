export const PRODUCT_SORT_LIST = ["asc", "desc"] as const;
export const PRODUCT_DEFAULT_SORT = PRODUCT_SORT_LIST[0];

export const PRODUCT_CATEGORY_LIST = [
  "all",
  "fashion",
  "beverage",
  "electronics",
  "kitchen",
  "fitness",
  "books",
] as const;
export const PRODUCT_DEFAULT_CATEGORY = PRODUCT_CATEGORY_LIST[0];
