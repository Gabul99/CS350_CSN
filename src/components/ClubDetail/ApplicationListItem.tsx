import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import CSButton from "../core/Button";
import ClubsApi from "../../network/api/ClubsApi";
import UserApi from "../../network/api/UserApi";

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
  applicationId: string;
}

const ApplicationListItem = ({ userId, clubId, applicationId}: Props) => {
  const [isDeleted, deleteMember] = useState(false);
  const [name, setName] = useState('Dummy');

  useEffect(() => {
    console.log(userId);
    UserApi.getUserInfoByUserId(userId)
    .then(async (data) => {
      console.log(data);
      setName(data.username);
      console.log('loaded');
    })
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
            ClubsApi.patchClubApplicationStatus(clubId, applicationId, 'ACCEPTED')
            .then(()=>deleteMember(true))
          }}
          size={12}
        ></CSButton>
        <CSButton 
          fill={true}
          color={Colors.GREEN_DARK}
          text="Deny"
          onPress={()=>{
            ClubsApi.patchClubApplicationStatus(clubId, applicationId, 'REJECTED')
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
