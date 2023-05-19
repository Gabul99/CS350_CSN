import React from "react";
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 66px;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  padding: 0 28px;
`;

const Title = styled.Text`
  font-family: 'Helvetica Neue';
  font-size: 32px;
  font-weight: 700;
`;

const SubscribeTopBar = () => {
  return (
    <Container>
      <Title>Subscribed</Title>
    </Container>
  );
};

export default SubscribeTopBar;
