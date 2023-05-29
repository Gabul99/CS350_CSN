import React, {useState} from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import CSButton from "../core/Button";

const Container = styled.View`
  width: 100%;
  height: 40px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE100};
  margin-bottom: 6px;
`;

const ButtonArea = styled.View`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  width: 200px;
  gap: 9px;
  align-items center;
`

interface Props {
  name: string;
  isAd?: boolean;
}

const ApplicationListItem = ({ name, isAd = false }: Props) => {
  const [isDeleted, deleteMember] = React.useState(false);

  return (
    <>
    {!isDeleted && 
    <Container>
      <CSText fontType={FontType.MEDIUM} fontSize={14}>
        {name}
      </CSText>
      <ButtonArea>
        <CSButton 
          fill={true}
          color={Colors.GREEN_DEEP}
          text="Accept"
          onPress={()=>deleteMember(true)}
          size={12}
        ></CSButton>
        <CSButton 
          fill={true}
          color={Colors.GREEN_DARK}
          text="Deny"
          onPress={()=>deleteMember(true)}
          size={12}
        ></CSButton>
      </ButtonArea>
    </Container>
    }
    </>
  );
};

export default ApplicationListItem;
