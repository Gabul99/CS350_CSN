import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import ApplicationListItem from "../../components/ClubDetail/ApplicationListItem";
import ClubInfoDto from "../../model/ClubInfoDto";
import ApplicationEntity from "../../model/ApplicationEntity";
import ClubsApi from "../../network/api/ClubsApi";

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  gap: 6px;
`;

interface Props{
  club: ClubInfoDto;
};

const ApplicationList = ({ club }:Props) => {
  if(!club) return <></>;
  const [applicants, setApplicants] = useState<ApplicationEntity[]>([]);

  useEffect(() => {
    ClubsApi.getClubAppicationsByClubId(club.id)
    .then(async (data) => {
      setApplicants(data);
    });
  }, []);

  return (
    <ScrollArea>
      {applicants.length > 0 && applicants.map(application => {
        return <ApplicationListItem userId={application.id} clubId={application.clubId} applicantId={application.applicantId} />
      })}
    </ScrollArea>
  );
};

export default ApplicationList;
