import styled from "@emotion/styled";

const S = {
  DropdownContainer: styled.div`
    width: 125px;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    overflow: visible;
  `,

  DropdownLabel: styled.div`
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  DropdownList: styled.ul`
    position: absolute;
    top: 100%;
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-height: 200px;
    overflow: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `,

  DropdownOption: styled.li`
    padding: 8px 12px;
    &:hover {
      background-color: #f0f0f0;
    }
  `,
};

export default S;
