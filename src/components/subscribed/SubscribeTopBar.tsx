import React from "react";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg";
import { View } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  padding: 0 16px;
`;

const Icons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const Title = styled.Text`
  font-family: 'Helvetica Neue';
  font-size: 24px;
  font-weight: 700;
  margin-right: auto;
`;

const SubscribeTopBar = () => {
  return (
    <Container>
      <Title>Subscribed</Title>
      <Icons>
        <WithLocalSvg asset={require("../../assets/icons/ic_explore.svg")} width={28} height={28} />
        <WithLocalSvg asset={require("../../assets/icons/ic_search.svg")} width={28} height={28} />
      </Icons>
    </Container>
  );
};

export default SubscribeTopBar;
