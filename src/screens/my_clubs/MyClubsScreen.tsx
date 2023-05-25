import React from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import CSText, { FontType } from "../../components/core/CSText";
import ClubSelectBar from "../../components/my_clubs/ClubSelectBar";

const Container = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
`;

const TopBarContainer = styled.View`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  padding: 0 16px;
`;

interface Props {
  navigation: any;
  rootNavigation: any;
}

const MyClubsScreen = ({ navigation, rootNavigation }: Props) => {
  return (
    <Container>
      <TopBarContainer>
        <CSText fontType={FontType.BOLD} fontSize={24}>
          My Clubs
        </CSText>
      </TopBarContainer>
      <ClubSelectBar />
    </Container>
  );
};

export default MyClubsScreen;
