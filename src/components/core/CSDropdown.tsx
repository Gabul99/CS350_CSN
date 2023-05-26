import React from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "./CSText";

const Container = styled.View`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
`;

interface Props {
  title: string;
}

const CsDropdown = ({ title }: Props) => {
  return (
    <Container>
      <CSText fontType={FontType.BOLD} fontSize={20}>
        {title}
      </CSText>
    </Container>
  );
};

export default CsDropdown;
