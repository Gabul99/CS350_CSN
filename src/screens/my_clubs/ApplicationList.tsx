import React from "react";
import styled from "styled-components/native";
import ApplicationListItem from "../../components/ClubDetail/ApplicationListItem";

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  gap: 6px;
`;

const ApplicationList = () => {
  return (
    <ScrollArea>
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
      <ApplicationListItem name={'이호연'} />
    </ScrollArea>
  );
};

export default ApplicationList;
