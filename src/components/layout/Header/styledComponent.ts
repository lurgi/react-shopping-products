import styled from "@emotion/styled";
import COLOR_PALETTE from "../../../style/colorPalette";

const S = {
  HeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;

    padding: 24px;
    background-color: ${COLOR_PALETTE.black};
    color: ${COLOR_PALETTE.white};
    box-sizing: border-box;
  `,

  CartButton: styled.button`
    position: relative;

    background: none;
    border: none;
    color: ${COLOR_PALETTE.white};
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
  `,

  ItemCount: styled.span`
    position: absolute;
    width: 19px;
    aspect-ratio: 1/1;
    right: 4.5px;
    bottom: 0px;

    font-size: 10px;
    font-weight: 700;
    padding: 0.5px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${COLOR_PALETTE.white};
    color: ${COLOR_PALETTE.black};
    border-radius: 100%;
    font-size: 14px;
  `,
};

export default S;
