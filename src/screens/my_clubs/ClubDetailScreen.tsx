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
import UpdateClubInfoDto from "../../model/UpdateClubInfoDto";

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
  const [club, setClub] = useState<ClubInfoDto>(selectedClub);

  const [clubState, setClubState] = useState<ClubMemberState>(ClubMemberState.GENERAL);
  const [state, setState] = useState<ClubDetailState>(ClubDetailState.GENERAL);
  const [posts, setPosts] = useState<PostInfoDto[]>([]);
  const [announcementPosts, setAnnouncementPosts] = useState<PostInfoDto[]>([]);
  const [updateClubInfo, setUpdateClubInfo] = useState<UpdateClubInfoDto>({
    imageUrl: selectedClub.imageUrl,
    clubname: selectedClub.clubname,
    description: selectedClub.description,
    canApply: selectedClub.canApply
  });

  const focused = useIsFocused();

  
  useEffect(() => {
    if (!focused) return;
    ClubsApi.getClubDetailByClubId(club.id)
    .then(async (data) => {
      setClub(data);
    });
    PostsApi.getPostByClubId(club.id, PostType.ANNOUNCEMENT)
        .then(data => {
          setAnnouncementPosts(data);
        })
    PostsApi.getPostByClubId(club.id, PostType.ORDINARY)
      .then(data => {
        setPosts(data);
      });
    if(clubState === ClubMemberState.GENERAL){
      UserApi.getUserClubs(true)
        .then(async (data) => {
          for (let idx in data) {
            if (club.id === data[idx]) {
              setClubState(ClubMemberState.ADMIN);
              return;
            }
          }
          if(clubState === ClubMemberState.GENERAL){
            UserApi.getUserClubs(false)
              .then(async (data) => {
                for (let idx in data) {
                  if (club.id === data[idx]) {
                    setClubState(ClubMemberState.MEMBER);
                    return;
                  }
                }
            });
          }
        });
      }
    }, [focused, state]);

  return (
    <Container>
      <ClubDetailTopBar clubId={club.id} clubDetail={club} state={state} setState={setState} clubState={clubState} navigation={navigation} updateClubInfo={updateClubInfo} />
      {state === ClubDetailState.GENERAL &&
        <>
          <ScrollArea contentContainerStyle={{rowGap: 6}}>
            <ClubDetailBar club={club} clubId={club.id} state={state} />
            {club && announcementPosts.map(post => {
              return <FeedPost rootNavigation={navigation} post={post} club={club} />
            })}
            {club && posts.map(post => {
              return <FeedPost rootNavigation={navigation} post={post} club={club} />
            })}
          </ScrollArea>
        </>
      }
      {state === ClubDetailState.SETTING &&
        <>
          <ScrollArea>
            <ClubSetting state={state} setState={setState} club={club} clubId={club.id} updateClubInfo={updateClubInfo} setUpdateClubInfo={setUpdateClubInfo}></ClubSetting>
            <MemberList club={club}></MemberList>
          </ScrollArea>
        </>
      }
      {state === ClubDetailState.APPLIST &&
        <>
          <ApplicationList club={club}/>
        </>
      }
			
    </Container>
  );
};

export default ClubDetailScreen;
