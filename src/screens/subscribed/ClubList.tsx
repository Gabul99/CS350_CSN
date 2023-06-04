import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import ClubListItem from "../../components/subscribed/ClubListItem";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import { useIsFocused } from "@react-navigation/native";
import ClubsApi from "../../network/api/ClubsApi";
import ClubInfoDto from "../../model/ClubInfoDto";

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
  searchKeyword: string;
}

const ClubList = ({ rootNavigation, searchKeyword }: Props) => {
  const [allClubs, setAllClubs] = useState<ClubInfoDto[]>([]);

  const focused = useIsFocused();

  useEffect(() => {
    if (!focused) return;
    ClubsApi.getClubs()
      .then(async data => {
        let result = [];
        for (let idx in data) {
          const dto = await ClubsApi.getClubDetailByClubId(data[idx]);
          result.push(dto);
        }
        setAllClubs(result);
      });
  }, [focused]);

  return (
    <Container>
      <ScrollArea>
        {!searchKeyword && allClubs.map(club =>
          <ClubListItem club={club} />
        )
        }
        {searchKeyword && allClubs.filter(club => club.clubname.includes(searchKeyword))
          .map(club => <ClubListItem club={club} />)}
      </ScrollArea>
      <FloatingCreatePost onPress={() => rootNavigation.navigate("CreateClub")}>
        <WithLocalSvg asset={require("../../assets/icons/ic_myclubs.svg")} width={32} height={32} />
      </FloatingCreatePost>
    </Container>
  );
};

export default ClubList;
