import React from "react";
import styled from "styled-components/native";
import ClubListItem from "../../components/subscribed/ClubListItem";

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  gap: 6px;
`;

const ClubList = () => {
  return (
    <ScrollArea>
      <ClubListItem name={'KAIST_Puple'} />
    </ScrollArea>
  );
};

export default ClubList;
