import React from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
`;

const Ellipsis = styled.View`
  width: 12px;
  height: 12px;
  background-color: ${Colors.GREEN_DARK};
  overflow: hidden;
  border-radius: 6px;
`;

const Empty = () => {
  return (
    <Container>
      <Content>
        <Ellipsis />
        <CSText fontType={FontType.MEDIUM} fontSize={20} color={Colors.GREEN_DARK}>
          No Subscribed Club
        </CSText>
        <Ellipsis />
      </Content>
    </Container>
  );
};

export default Empty;
