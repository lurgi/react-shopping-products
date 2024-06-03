import { Product } from "../../../types/products";
import { PropsWithChildren } from "react";
import ToggleItemButton from "../ToggleItemButton";
import S from "./StyledComponent";

interface ProductCardProps extends PropsWithChildren {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <S.ProductCard>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ProductInfo>
        <S.ProductName>{product.name}</S.ProductName>
        <S.Price>{`${product.price.toLocaleString()}원`}</S.Price>
        <ToggleItemButton id={product.id} />
      </S.ProductInfo>
    </S.ProductCard>
  );
};

export default ProductCard;
