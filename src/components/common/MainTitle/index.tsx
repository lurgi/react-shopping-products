import { PropsWithChildren } from "react";
import S from "./styledComponent";

const MainTitle = ({ children }: PropsWithChildren) => {
  return <S.Title>{children}</S.Title>;
};

export default MainTitle;
