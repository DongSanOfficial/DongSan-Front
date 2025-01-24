import React, { useState } from "react";
import styled from "styled-components";
import Divider from "../../../components/Divider";
import { ReactComponent as DongSanTextLogo } from "../../../assets/svg/DongSanTextLogo.svg";
import DropDownButton from "../../../components/button/DropDownButton";

const Container = styled.div`
  width: 100%;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DropdownWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const sortOptions = [
  { value: "popular", label: "인기순" },
  { value: "rating", label: "별점순" }
];

const BottomSheetHeader = () => {
  const [sortValue, setSortValue] = useState(sortOptions[0].value);

  return (
    <Container>
      <DropdownContainer>
        <DongSanTextLogo />
        <DropdownWrapper>
          <DropDownButton
            options={sortOptions}
            value={sortValue}
            onChange={setSortValue}
          />
        </DropdownWrapper>
      </DropdownContainer>
      <Divider />
    </Container>
  );
};

export default BottomSheetHeader;