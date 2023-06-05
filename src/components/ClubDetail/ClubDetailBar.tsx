import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import CSButton from "../core/Button";
import ClubInfoDto from "../../model/ClubInfoDto";
import ClubsApi from "../../network/api/ClubsApi";
import { Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import UserApi from "../../network/api/UserApi";
import { AxiosError } from "axios";

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.View`
  width: 100%;
  padding: 18px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 12px;
`;

const ImagePlaceBig = styled.View`
  width: 96px;
  height: 96px;
  background-color: lightgray;
  border-radius: 48px;
  overflow: hidden;
`;

const ClubInfoArea = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
`;

const ClubButtonArea = styled.View`
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 6px;
`;

const DetailDescriptionArea = styled.View`
  width: 100%;
  padding: 0 18px 12px 18px;
`;

interface Props {
  club: ClubInfoDto;
}

const ClubDetailBar = ({ club }: Props) => {
  const [subscribed, setSubscribed] = useState(false);
  const [joined, setJoin] = useState(2);
  const [clubDetail, setClubDetail] = useState<ClubInfoDto>();
  const focused = useIsFocused();
  const clubId = 

  
  useEffect(() => {
    if(!focused) return;
    UserApi.getUserSubscriptions()
      .then(data => {
        for (let idx in data) {
          if (club.id === data[idx]) {
            setSubscribed(true);
            return;
          }
        }
      })
  }, [focused]);

  const handleSubsButtonPress = () => {
    if(subscribed){
      console.log('presseds');
      console.log(club.id);
      UserApi.deleteUserSubscriptionsByClubId(club.id)
        .then(() => {
          setSubscribed(false);
          console.log('unsubscribed');
        })
        .catch((err)=>{
          console.error('login err', err);
          const axiosError = err as AxiosError;
          console.log(axiosError.code, axiosError.message, axiosError.status);
        });
    }
    else{
      console.log('pressedu');
      UserApi.postUserSubscriptionsByClubId(club.id)
        .then(() => {
          setSubscribed(true);
          console.log('subscribed');
        });
    }
  };
  const handleJoinButtonPress = () => {
    if(joined == 2) setJoin(3);
  };

  return (
    <Container>
      <Header>
        <ImagePlaceBig>
          <Image source={{ uri: club.imageUrl }} style={{ width: 96, height: 96, borderRadius: 48 }} />
        </ImagePlaceBig>
        <ClubInfoArea>
          <CSText fontType={FontType.BOLD} color={Colors.BLACK100} fontSize={24}>{club.clubname}</CSText>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>{club.memberCount}</CSText>
          <ClubButtonArea>
            <CSButton 
              fill={joined==2}
              color={joined==1?Colors.GREEN_DEEP:joined==2?Colors.GREEN_DEEP:Colors.GREEN_BACKGROUND}
              text={joined==0?"Cannot Join":joined==1?"Joined":joined==2?"Join":"Applied"}
              onPress={handleJoinButtonPress}
            ></CSButton>
            <CSButton 
              fill={!subscribed}
              color={Colors.GREEN_DEEP}
              text={subscribed?"Subscribed" : "Subscribe"}
              onPress={handleSubsButtonPress}
            ></CSButton>
          </ClubButtonArea>
        </ClubInfoArea>
      </Header>
      <DetailDescriptionArea>
        <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>{club.description}</CSText>
      </DetailDescriptionArea>
    </Container>
  );
};

export default ClubDetailBar;
