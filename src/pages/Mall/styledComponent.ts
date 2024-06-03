import styled from "@emotion/styled";

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

export default S;
