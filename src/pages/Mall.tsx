import { useEffect } from "react";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";

import { baseStyle } from "../style/baseStyle";

import useProducts from "../hooks/useProducts";
import useCustomContext from "../hooks/useCustomContext";
import useToggleCartItem from "../hooks/useToggleCartItem";

import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import InfiniteScrollComponent from "../components/InfiniteProductsScrollComponent";
import MainTitle from "../components/MainTitle";
import { ToastContext } from "../components/Toasts/ToastProvider";
import { PRODUCT_CATEGORY, PRODUCT_SORT } from "../constants/mall";

const S = {
  MainMall: styled.div`
    padding: 36px 24px;

    display: flex;
    flex-direction: column;
    gap: 24px;
  `,

  Toolbar: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  ProductList: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 183px);
    gap: 16px;
  `,
};

const Mall = () => {
  const {
    products,
    isLoading: isProductLoading,
    error: productError,
    fetchNextPage,
    handleCategoryChange,
    handleSortChange,
  } = useProducts();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    checkSelected,
    isLoading: isToggleCartItemLoading,
    error: toggleCartItemError,
  } = useToggleCartItem();

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

  return (
    <>
      <Global styles={baseStyle} />
      <Header itemCount={cartItems.length} />
      <S.MainMall>
        <MainTitle>러기의 쇼핑몰</MainTitle>
        <S.Toolbar>
          <Dropdown options={PRODUCT_CATEGORY} handleChange={handleCategoryChange} />
          <Dropdown options={PRODUCT_SORT} handleChange={handleSortChange} />
        </S.Toolbar>
        <S.ProductList>
          <InfiniteScrollComponent
            handleCartItems={{
              addToCart,
              checkSelected,
              removeFromCart,
              isLoading: isToggleCartItemLoading,
            }}
            productObject={{
              products,
              isLoading: isProductLoading,
              error: productError,
              fetchNextPage,
            }}
          />
        </S.ProductList>
      </S.MainMall>
    </>
  );
};

export default Mall;
