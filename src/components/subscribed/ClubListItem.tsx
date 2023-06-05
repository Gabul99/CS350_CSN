import React from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import ClubInfoDto from "../../model/ClubInfoDto";

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

const SubscribeButton = styled.TouchableHighlight<{isSelected: boolean}>`
  width: 108px;
  height: 36px;
  background-color: ${props => props.isSelected ? Colors.WHITE100 : Colors.GREEN_DEEP};
  border-radius: 6px;
  border: 1px solid ${props => props.isSelected ? Colors.GREEN_DARK : 'rgba(0, 0, 0, 0)'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  club: ClubInfoDto;
}

const ClubListItem = ({ club }: Props) => {
  const isSelected = false;

  return (
    <Container>
      <CSText fontType={FontType.MEDIUM} fontSize={18}>
        {club.clubname}
      </CSText>
      <SubscribeButton isSelected={isSelected} onPress={() => {}} underlayColor={'rgba(256, 256, 256, 0.12)'}>
        <CSText fontType={FontType.MEDIUM} fontSize={18} color={isSelected ? Colors.GREEN_DARK : Colors.BLACK100}>
          {isSelected ? 'Subscribed' : 'Subscribe'}
        </CSText>
      </SubscribeButton>
    </Container>
  );
};

export default ClubListItem;
