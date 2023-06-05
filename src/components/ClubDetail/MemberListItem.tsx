import React, {useState} from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import CSButton from "../core/Button";
import MemberDto from "../../model/MemberDto";
import ClubsApi from "../../network/api/ClubsApi";
import ClubInfoDto from "../../model/ClubInfoDto";

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
  club: ClubInfoDto;
  member: MemberDto;
}

const MemberListItem = ({ club, member }: Props) => {
  if(!member) return (<></>);
  const [isAdmin, setIsAdmin] = React.useState(member.isAdmin);
  const [isDeleted, deleteMember] = React.useState(false);

  return (
    <>
    {!isDeleted && 
    <Container>
      <CSText fontType={FontType.MEDIUM} fontSize={14}>
        {member.username}
      </CSText>
      <ButtonArea>
        <CSButton 
          fill={isAdmin}
          color={Colors.GREEN_DEEP}
          text={isAdmin?"Admin" : "Member"}
          onPress={()=>{
            ClubsApi.patchClubMember(club.id, member.userId, !isAdmin)
            .then(() => setIsAdmin(!isAdmin));
          }}
          size={12}
        ></CSButton>
        <CSButton 
          fill={true}
          color={Colors.GREEN_DARK}
          text="Pull Out"
          onPress={()=>{
            ClubsApi.deleteClubMember(club.id, member.userId)
            .then(() => deleteMember(true));
          }}
          size={12}
        ></CSButton>
      </ButtonArea>
    </Container>
    }
    </>
  );
};

export default MemberListItem;
