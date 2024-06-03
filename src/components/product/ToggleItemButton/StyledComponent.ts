import styled from "@emotion/styled";
import COLOR_PALETTE from "../../../style/colorPalette";

const S = {
  ToggleItemButton: styled.button<{ isSelected: boolean }>`
    width: 60px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    background-color: ${({ isSelected }) => (isSelected ? COLOR_PALETTE.lightGrey : COLOR_PALETTE.black)};
    color: ${({ isSelected }) => (isSelected ? COLOR_PALETTE.black : COLOR_PALETTE.white)};
    padding: 8px;
    margin: 4px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-end;
    &:hover {
      opacity: 0.8;
    }
  `,
};

export default S;
