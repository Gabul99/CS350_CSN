import React, { useEffect, useState } from "react";
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
import PostInfoDto from "../../model/PostInfoDto";
import PostsApi from "../../network/api/PostsApi";
import PostType from "../../model/type/PostType";
import ClubInfoDto from "../../model/ClubInfoDto";

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
  selectedClubId: string;
  selectedClub: ClubInfoDto;
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

const ClubDetailScreen = ({ navigation, selectedClubId, selectedClub }: Props) => {
  const [clubState, setClubState] = useState<ClubMemberState>(ClubMemberState.ADMIN);
  const [state, setState] = useState<ClubDetailState>(ClubDetailState.GENERAL);
  const [posts, setPosts] = useState<PostInfoDto[]>([]);

  PostsApi.getPostByClubId(selectedClubId, PostType.ORDINARY)
    .then(data => {
      setPosts(data);
    });

  return (
    <Container>
      <ClubDetailTopBar clubName={'KAIST_Puple'} state={state} setState={setState} clubState={clubState} navigation={navigation} />
      {state === ClubDetailState.GENERAL &&
        <>
          <ScrollArea contentContainerStyle={{rowGap: 6}}>
            <ClubDetailBar club={selectedClub} />
            {selectedClub && posts.map(post => {
            return <FeedPost rootNavigation={navigation} post={post} club={selectedClub} />
          })}
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
