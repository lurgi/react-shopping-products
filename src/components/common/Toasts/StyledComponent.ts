import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import COLOR_PALETTE from "../../../style/colorPalette";

const slideIn = keyframes`
  from {
    transform: translateY(20px) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
  to {
    transform: translateY(20px) translateX(-50%);
    opacity: 0;
  }
`;

const BaseToast = styled.div<{ visible: boolean }>`
  padding: 16px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
  animation: ${({ visible }) => (visible ? slideIn : slideOut)} 0.5s ease-out;
  animation-fill-mode: forwards;
  z-index: 1000;
`;

const S = {
  SuccessToast: styled(BaseToast)`
    background-color: ${COLOR_PALETTE.success};
  `,
  FailToast: styled(BaseToast)`
    background-color: ${COLOR_PALETTE.fail};
  `,
};

export default S;
