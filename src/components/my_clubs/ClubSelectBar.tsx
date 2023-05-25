import React from "react";
import styled from "styled-components/native";
import { ScrollView, Text } from "react-native";
import { Colors } from "../../style/Colors";
import CircularClubBadge from "./CircularClubBadge";

const ScrollContainer = styled.View`
  width: 100%;
  height: 78px;
  background-color: ${Colors.WHITE100};
  padding: 12px 0;
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 12px;
  gap: 8px;
  align-items: center;
`;

const ClubSelectBar = () => {
  return (
    <ScrollContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Container>
          <CircularClubBadge />
          <CircularClubBadge />
          <CircularClubBadge />
          <CircularClubBadge />
          <CircularClubBadge />
          <CircularClubBadge />
          <CircularClubBadge />
          <CircularClubBadge />
          <CircularClubBadge />
          <CircularClubBadge />
        </Container>
      </ScrollView>
    </ScrollContainer>
  );
};

export default ClubSelectBar;
