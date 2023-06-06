import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import MemberListItem from "../../components/ClubDetail/MemberListItem";
import ClubInfoDto from "../../model/ClubInfoDto";
import MemberDto from "../../model/MemberDto";
import { useIsFocused } from "@react-navigation/native";
import ClubsApi from "../../network/api/ClubsApi";

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  gap: 6px;
`;

interface Props{
  club: ClubInfoDto
};

const MemberList = ({ club }:Props) => {
  if(!club) return <></>;
  const [members, setMembers] = useState<MemberDto[]>([]);
  const focused = useIsFocused();

  useEffect(() => {
    ClubsApi.getClubMembersByClubId(club.id)
      .then(async (data) => {
        setMembers(data);
      });
  }, []);

  return (
    <ScrollArea>
      {members.length > 0 && members.map(member => {
        return <MemberListItem club={club} member={member}/>;
      })}
    </ScrollArea>
  );
};

export default MemberList;
