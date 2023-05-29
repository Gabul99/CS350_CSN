import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import ClubDetailScreen from "./ClubDetailScreen";
import CSText, { FontType } from "../../components/core/CSText";
import ClubSelectBar from "../../components/my_clubs/ClubSelectBar";
import FeedPost from "../../components/core/FeedPost";
import { WithLocalSvg } from "react-native-svg";

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

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.View`
  position: relative;
  padding-bottom: 44px;
`;

const FloatingCreatePost = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  bottom: 52px;
  right: 8px;
  background-color: ${Colors.GREEN_DEEP};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: any;
  rootNavigation: any;
}

const MyClubsScreen = ({ navigation, rootNavigation }: Props) => {
  return (
      //<ClubDetailScreen></ClubDetailScreen>
    <Container>
      <TopBarContainer>
        <CSText fontType={FontType.BOLD} fontSize={24}>
          My Clubs
        </CSText>
      </TopBarContainer>
      <ContentArea>
        <ScrollArea contentContainerStyle={{ rowGap: 6 }}>
          <ClubSelectBar />
          <FeedPost />
          <FeedPost />
          <FeedPost />
        </ScrollArea>
        <FloatingCreatePost onPress={() => rootNavigation.navigate('CreatePost')}>
          <WithLocalSvg asset={require("../../assets/icons/ic_stylus.svg")} width={32} height={32} />
        </FloatingCreatePost>
      </ContentArea>
    </Container>
  );
};

export default MyClubsScreen;
