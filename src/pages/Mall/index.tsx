import { Global } from "@emotion/react";

import { baseStyle } from "../../style/baseStyle";

import useProducts from "../../hooks/useProducts";
import useCustomContext from "../../hooks/useCustomContext";
import useErrorAlert from "../../hooks/useErrorAlert";

import { ToggleCartItemContext } from "../../components/provider/ToggleCartItemProvider";
import Dropdown from "../../components/common/Dropdown";
import Header from "../../components/layout/Header";
import InfiniteScroll from "../../components/utils/InfiniteScroll";
import MainTitle from "../../components/common/MainTitle";
import ProductCard from "../../components/product/ProductCard";

import { ERROR_MESSAGE } from "../../constants/errorMessage/ko";

import S from "./styledComponent";

import { PRODUCT_CATEGORY_LIST, PRODUCT_SORT_LIST } from "../../constants/mallData";
import { LanguageContext } from "../../components/provider/LanguageProvider";

const Mall = () => {
  const {
    products,
    isLoading: isProductLoading,
    error: productError,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  } = useProducts();
  const { messages } = useCustomContext(LanguageContext);
  const { cartItems, error: toggleCartItemError } = useCustomContext(ToggleCartItemContext);
  useErrorAlert({ toggleCartItemError, productError });

  return (
    <>
      <Global styles={baseStyle} />
      <Header itemCount={cartItems.length} />
      <S.MainMall>
        <MainTitle>{messages.mallTitle}</MainTitle>
        <S.Toolbar>
          <Dropdown options={PRODUCT_CATEGORY_LIST} handleChange={handleCategoryChange} />
          <Dropdown options={PRODUCT_SORT_LIST} handleChange={handleSortChange} />
        </S.Toolbar>
        <S.ProductList>
          <InfiniteScroll isLoading={isProductLoading} handleScroll={fetchNextPage}>
            {products.map((product, index) => (
              <ProductCard key={`${index}${product.id}`} product={product} />
            ))}
            {productError! && <div>{ERROR_MESSAGE.getProducts}</div>}
          </InfiniteScroll>
        </S.ProductList>
      </S.MainMall>
    </>
  );
};

export default Mall;
