import React from "react";
import styled from "styled-components/native";
import { ScrollView, Text } from "react-native";
import { Colors } from "../../style/Colors";
import CircularClubBadge from "./CircularClubBadge";
import ClubInfoDto from "../../model/ClubInfoDto";

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

interface Props {
  rootNavigation: any;
  clubList: ClubInfoDto[];
  selectedClubId: string | undefined;
  setSelectedClubId: (value: string) => void;
}

const ClubSelectBar = ({ rootNavigation, clubList, selectedClubId, setSelectedClubId }: Props) => {
  return (
    <ScrollContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Container>
          {clubList.map(club => {
            return <CircularClubBadge rootNavigation={rootNavigation} club={club} selected={selectedClubId === club.id} onPress={() => setSelectedClubId(club.id)} />;
          })}
        </Container>
      </ScrollView>
    </ScrollContainer>
  );
};

export default ClubSelectBar;
