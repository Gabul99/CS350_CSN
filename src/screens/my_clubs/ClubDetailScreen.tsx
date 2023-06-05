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
import UserApi from "../../network/api/UserApi";
import ClubsApi from "../../network/api/ClubsApi";
import { useIsFocused } from "@react-navigation/native";

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
  route: any;
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

const ClubDetailScreen = ({ navigation, route }: Props) => {
  const selectedClub = route.params.selectedClub as ClubInfoDto;

  const [clubState, setClubState] = useState<ClubMemberState>(ClubMemberState.GENERAL);
  const [state, setState] = useState<ClubDetailState>(ClubDetailState.GENERAL);
  const [posts, setPosts] = useState<PostInfoDto[]>([]);
  const [announcementPosts, setAnnouncementPosts] = useState<PostInfoDto[]>([]);

  const focused = useIsFocused();

  
  useEffect(() => {
    if (!focused) return;
    PostsApi.getPostByClubId(selectedClub.id, PostType.ANNOUNCEMENT)
        .then(data => {
          setAnnouncementPosts(data);
        })
    PostsApi.getPostByClubId(selectedClub.id, PostType.ORDINARY)
      .then(data => {
        setPosts(data);
      });
    if(clubState === ClubMemberState.GENERAL){
      UserApi.getUserClubs(true)
        .then(async (data) => {
          for (let idx in data) {
            if (selectedClub.id === data[idx]) {
              setClubState(ClubMemberState.ADMIN);
              console.log('admin set');
              return;
            }
          }
          if(clubState === ClubMemberState.GENERAL){
            UserApi.getUserClubs(false)
              .then(async (data) => {
                for (let idx in data) {
                  if (selectedClub.id === data[idx]) {
                    setClubState(ClubMemberState.MEMBER);
                    return;
                  }
                }
            });
          }
        });
      }
    }, [focused]);

  return (
    <Container>
      <ClubDetailTopBar club={selectedClub} state={state} setState={setState} clubState={clubState} navigation={navigation} />
      {state === ClubDetailState.GENERAL &&
        <>
          <ScrollArea contentContainerStyle={{rowGap: 6}}>
            <ClubDetailBar club={selectedClub} />
            {selectedClub && announcementPosts.map(post => {
              return <FeedPost rootNavigation={navigation} post={post} club={selectedClub} />
            })}
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
