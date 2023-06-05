import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SubscribeTopBar from "../../components/subscribed/SubscribeTopBar";
import FeedPost from "../../components/core/FeedPost";
import styled from "styled-components/native";
import Empty from "../../components/subscribed/Empty";
import { Colors } from "../../style/Colors";
import ClubList from "./ClubList";
import UserApi from "../../network/api/UserApi";
import { useIsFocused } from "@react-navigation/native";
import PostsApi from "../../network/api/PostsApi";
import PostInfoDto from "../../model/PostInfoDto";
import ClubInfoDto from "../../model/ClubInfoDto";
import ClubsApi from "../../network/api/ClubsApi";

export enum SubscribedState {
  FEED,
  SEARCH,
  NAVIGATE,
}

interface Props {
  navigation: any;
  rootNavigation: any;
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

const SubscribedScreen = ({ navigation, rootNavigation }: Props) => {
  const [state, setState] = useState<SubscribedState>(SubscribedState.FEED);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [subscribedClubIds, setSubscribedClubIds] = useState<string[]>([]);
  const [subscribedClubList, setSubscribedClubList] = useState<ClubInfoDto[]>([]);
  const [posts, setPosts] = useState<PostInfoDto[]>([]);
  const focused = useIsFocused();

  useEffect(() => {
    if (!focused) return;
    UserApi.getUserSubscriptions()
      .then(async data => {
        let result = [];
        for (let idx in data) {
          const dto = await ClubsApi.getClubDetailByClubId(data[idx]);
          result.push(dto);
        }
        setSubscribedClubIds(data);
        setSubscribedClubList(result);
      });
    PostsApi.getPosts()
      .then(data => setPosts(data));
  }, [focused]);

  return (
    <Container>
      <SubscribeTopBar state={state} setState={setState} searchKeyword={searchKeyword}
                       setSearchKeyword={setSearchKeyword} />
      {state === SubscribedState.FEED &&
      <>
        {subscribedClubIds.length === 0 &&
        <Content>
          <Empty />
        </Content>
        }
        {subscribedClubIds.length !== 0 &&
        <ScrollArea contentContainerStyle={{rowGap: 6}}>
          {posts.map(post => {
            const club = subscribedClubList.filter(item => item.id === post.clubId)[0];
            return <FeedPost rootNavigation={rootNavigation} post={post} club={club} />;
          })}
        </ScrollArea>
        }
      </>
      }
      {state !== SubscribedState.FEED &&
        <ClubList rootNavigation={rootNavigation} searchKeyword={searchKeyword} />
      }
    </Container>
  );
};

export default SubscribedScreen;
