import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import CSButton from "../core/Button";
import ClubsApi from "../../network/api/ClubsApi";

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
  userId: string;
  clubId: string;
  applicantId: string;
}

const ApplicationListItem = ({ userId, clubId, applicantId}: Props) => {
  const [isDeleted, deleteMember] = useState(false);
  const [name, setName] = useState('Dummy');

  useEffect(() => {
    //TODO : Get username from the application
  }, []);

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
          onPress={()=>{
            ClubsApi.patchClubApplicationStatus(clubId, applicantId, 'ACCEPTED')
            .then(()=>deleteMember(true))
          }}
          size={12}
        ></CSButton>
        <CSButton 
          fill={true}
          color={Colors.GREEN_DARK}
          text="Deny"
          onPress={()=>{
            ClubsApi.patchClubApplicationStatus(clubId, applicantId, 'REJECTED')
            .then(()=>deleteMember(true))
          }}
          size={12}
        ></CSButton>
      </ButtonArea>
    </Container>
    }
    </>
  );
};

export default ApplicationListItem;
