import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import ClubInfoDto from "../../model/ClubInfoDto";
import CSButton from "../core/Button";
import UserApi from "../../network/api/UserApi";
import { TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.WHITE100};
`;
const BtnContainer = styled.View`
  margin-left: auto;
  width: 40%;
  padding: 10px 0;
`;

interface Props {
  rootNavigation?: any;
  club: ClubInfoDto;
}

const ClubListItem = ({ rootNavigation, club }: Props) => {
  const [subscribed, setSubscribed] = useState(false);
  const focused = useIsFocused();

  useEffect(() => {
    UserApi.getUserSubscriptions()
    .then(async (data) => {
      for (let idx in data){
        if(club.id == data[idx]){
          setSubscribed(true);
          return;
        }
      }
    })
  }, [rootNavigation]);

  const handleSubsButtonPress = () => {
    if(subscribed){
      UserApi.deleteUserSubscriptionsByClubId(club.id)
        .then(() => {
          setSubscribed(false);
        });
    }
    else{
      UserApi.postUserSubscriptionsByClubId(club.id)
        .then(() => {
          setSubscribed(true);
        });
    }
  };

  return (
    <Container>
      <TouchableOpacity onPress={() => rootNavigation.navigate('ClubDetail', {selectedClub: club})}>
        <CSText fontType={FontType.MEDIUM} fontSize={18}>
          {club.clubname}
        </CSText>
      </TouchableOpacity>
      <BtnContainer>
        <CSButton
          size={18}
          fill={!subscribed}
          color={Colors.GREEN_DEEP}
          text={subscribed ? 'Subscribed' : 'Subscribe'}
          onPress={handleSubsButtonPress}
        ></CSButton>
      </BtnContainer>
      
    </Container>
  );
};

export default ClubListItem;
