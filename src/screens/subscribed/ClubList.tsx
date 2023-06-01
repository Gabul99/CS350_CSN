import React from "react";
import styled from "styled-components/native";
import ClubListItem from "../../components/subscribed/ClubListItem";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  gap: 6px;
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
  rootNavigation: any;
}

const ClubList = ({ rootNavigation }: Props) => {
  return (
    <Container>
      <ScrollArea>
        <ClubListItem name={"KAIST_Puple"} />
      </ScrollArea>
      <FloatingCreatePost onPress={() => rootNavigation.navigate('CreateClub')}>
        <WithLocalSvg asset={require("../../assets/icons/ic_myclubs.svg")} width={32} height={32} />
      </FloatingCreatePost>
    </Container>
  );
};

export default ClubList;
