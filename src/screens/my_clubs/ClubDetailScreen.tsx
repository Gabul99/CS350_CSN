import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import FeedPost from "../../components/core/FeedPost";
import styled from "styled-components/native";
import Empty from "../../components/subscribed/Empty";
import { Colors } from "../../style/Colors";
import ClubDetailBar from "../../components/ClubDetail/ClubDetailBar";
import ClubDetailTopBar from "../../components/ClubDetail/ClubDetailTopBar";
import ClubSetting from "../../components/ClubDetail/ClubSetting";
import MemberList from "./MemberList";
import ApplicationList from "./ApplicationList";

export enum ClubMemberState {
  GENERAL,
  MEMBER,
  ADMIN,
}

export enum ClubDetailState {
  GENERAL,
  SETTING,
  APPLIST,
}

interface Props {
  navigation: any;
  // rootNavigation: any;
}

const Container = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
`;

const Content = styled.View`
  flex-grow: 1;
`;

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ClubDetailScreen = ({ navigation }: Props) => {
  const [clubState, setClubState] = useState<ClubMemberState>(ClubMemberState.ADMIN);
  const [state, setState] = useState<ClubDetailState>(ClubDetailState.GENERAL);

  return (
    <Container>
      <ClubDetailTopBar clubName={'KAIST_Puple'} state={state} setState={setState} clubState={clubState} navigation={navigation} />
      {state === ClubDetailState.GENERAL &&
        <>
          <ScrollArea contentContainerStyle={{rowGap: 6}}>
            <ClubDetailBar></ClubDetailBar>
            <FeedPost />
            <FeedPost />
            <FeedPost />
          </ScrollArea>
        </>
      }
      {state === ClubDetailState.SETTING &&
        <>
          <ScrollArea>
            <ClubSetting state={state} setState={setState} ></ClubSetting>
            <MemberList></MemberList>
          </ScrollArea>
        </>
      }
      {state === ClubDetailState.APPLIST &&
        <>
          <ApplicationList></ApplicationList>
        </>
      }
			
    </Container>
  );
};

export default ClubDetailScreen;
