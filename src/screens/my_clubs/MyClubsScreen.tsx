import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import ClubDetailScreen from "./ClubDetailScreen";

const Container = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
`;
interface Props {
  navigation: any;
  rootNavigation: any;
}

const MyClubsScreen = ({ navigation, rootNavigation }: Props) => {
  return (
    <>
      <ClubDetailScreen></ClubDetailScreen>
      <Text>
        My clubs
      </Text>
    </>
  );
};

export default MyClubsScreen;
