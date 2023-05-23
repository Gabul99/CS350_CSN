import React from "react";
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
  return (
    <Container>
      <Header>
        <ImagePlaceBig />
        <ClubInfoArea>
          <CSText fontType={FontType.BOLD} color={Colors.BLACK100} fontSize={24}>KAIST Puple</CSText>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>87 members</CSText>
          <ClubButtonArea>
            <CSButton color={Colors.GREEN_BACKGROUND} text={"Cannot Join"}></CSButton>
            <CSButton fill={true} color={Colors.GREEN_DEEP} text={"Subscribe"}></CSButton>
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
