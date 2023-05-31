import React from "react";
import styled from "styled-components/native";
import MemberListItem from "../../components/ClubDetail/MemberListItem";

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  gap: 6px;
`;

const MemberList = () => {
  return (
    <ScrollArea>
      <MemberListItem isAd={true} name={'이호연'} />
      <MemberListItem isAd={true} name={'윤영일'} />
      <MemberListItem isAd={true} name={'이희찬'} />
      <MemberListItem name={'조민규'} />
      <MemberListItem name={'최형진'} />
      <MemberListItem name={'이호연'} />
      <MemberListItem name={'윤영일'} />
      <MemberListItem name={'이희찬'} />
      <MemberListItem name={'조민규'} />
      <MemberListItem name={'최형진'} />
      <MemberListItem name={'이호연'} />
      <MemberListItem name={'윤영일'} />
      <MemberListItem name={'이희찬'} />
      <MemberListItem name={'조민규'} />
      <MemberListItem name={'최형진'} />
    </ScrollArea>
  );
};

export default MemberList;
