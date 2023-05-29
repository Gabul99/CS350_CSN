import React, { useState } from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import CSButton from "../core/Button";

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


const ClubDetailBar = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [joined, setJoin] = useState(2);
  // 0: cannot join 1: Joined 2: Joinable 3: Applied

  const handleSubsButtonPress = () => {
    setSubscribed(!subscribed);
  };
  const handleJoinButtonPress = () => {
    if(joined == 2) setJoin(3);
  };

  return (
    <Container>
      <Header>
        <ImagePlaceBig />
        <ClubInfoArea>
          <CSText fontType={FontType.BOLD} color={Colors.BLACK100} fontSize={24}>KAIST Puple</CSText>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>87 members</CSText>
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
        <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at risus et lorem tincidunt laoreet. Nullam eget nunc ac tellus dictum convallis. </CSText>
      </DetailDescriptionArea>
    </Container>
  );
};

export default ClubDetailBar;
