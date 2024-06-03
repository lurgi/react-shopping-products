import { HttpResponse, http } from "msw";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CART_ITEMS_ENDPOINT } from "../api/endPoint";
import { server } from "../mocks/server";
import useToggleCartItem from "../hooks/useToggleCartItem";
import { waitFor } from "@testing-library/react";

describe("useToggleCartItem", () => {
  const MOCK_ITEM_ID = 100;

  it("사용자가 담기 버튼을 누르면, 장바구니에 담긴 아이템 종류의 갯수가 +1된다", async () => {
    const { result } = renderHook(() => useToggleCartItem());

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(3);
    });

    await waitFor(async () => {
      await result.current.addToCart(MOCK_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(4);
    });
  });

  it("사용자가 빼기 버튼을 누르면, 장바구니에 담긴 아이템 종류의 갯수가 -1된다", async () => {
    const { result } = renderHook(() => useToggleCartItem());

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(3);
    });

    await waitFor(async () => {
      await result.current.removeFromCart(MOCK_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(2);
    });
  });

  it("담기 요청 중 에러가 발생하면, error값이 반환된다", async () => {
    server.use(
      http.get(CART_ITEMS_ENDPOINT, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useToggleCartItem());

    result.current.addToCart(MOCK_ITEM_ID);

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });

  it("장바구니에 아이템을 추가할 때 로딩 상태를 표시한다", async () => {
    const { result } = renderHook(() => useToggleCartItem());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.addToCart(MOCK_ITEM_ID);
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("장바구니에 아이템을 삭제할 때 로딩 상태를 표시한다", async () => {
    const { result } = renderHook(() => useToggleCartItem());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.removeFromCart(MOCK_ITEM_ID);
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
