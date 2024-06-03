import React from "react";
import S from "./styledComponent";

interface LoadingDotsProps {
  type?: "black" | "white";
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ type = "black" }) => {
  return (
    <S.Container>
      <S.Dot type={type} />
      <S.Dot type={type} />
      <S.Dot type={type} />
    </S.Container>
  );
};

export default LoadingDots;
