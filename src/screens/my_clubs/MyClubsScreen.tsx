import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import CSText, { FontType } from "../../components/core/CSText";
import ClubSelectBar from "../../components/my_clubs/ClubSelectBar";
import FeedPost from "../../components/core/FeedPost";
import { WithLocalSvg } from "react-native-svg";
import UserApi from "../../network/api/UserApi";
import ClubsApi from "../../network/api/ClubsApi";
import ClubInfoDto from "../../model/ClubInfoDto";
import PostInfoDto from "../../model/PostInfoDto";
import PostsApi from "../../network/api/PostsApi";
import PostType from "../../model/type/PostType";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
`;

const TopBarContainer = styled.View`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  padding: 0 16px;
`;

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.View`
  position: relative;
  padding-bottom: 44px;
  height: 100%;
`;

const FloatingCreatePost = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  bottom: 52px;
  right: 8px;
  background-color: ${Colors.GREEN_DEEP};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: any;
  rootNavigation: any;
}

const MyClubsScreen = ({ navigation, rootNavigation }: Props) => {
  const [selectedClubId, setSelectedClubId] = useState<string>();
  const [userClubs, setUserClubs] = useState<ClubInfoDto[]>([]);
  const [posts, setPosts] = useState<PostInfoDto[]>([]);
  const [announcementPosts, setAnnouncementPosts] = useState<PostInfoDto[]>([]);

  const focused = useIsFocused();

  useEffect(() => {
    UserApi.getUserClubs(false)
      .then(async (data) => {
        let result = [];
        for (let idx in data) {
          const dto = await ClubsApi.getClubDetailByClubId(data[idx]);
          result.push(dto);
        }
        if (result.length > 0) setSelectedClubId(result[0].id);
        setUserClubs(result);
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [selectedClubId, focused]);

  const refresh = () => {
    if (!selectedClubId || !focused) return;
    UserApi.getUserClubs(false)
      .then(async (data) => {
        let result = [];
        for (let idx in data) {
          const dto = await ClubsApi.getClubDetailByClubId(data[idx]);
          result.push(dto);
        }
        setUserClubs(result);
      });
    PostsApi.getPostByClubId(selectedClubId, PostType.ANNOUNCEMENT)
      .then(data => {
        setAnnouncementPosts(data);
      })
    PostsApi.getPostByClubId(selectedClubId, PostType.ORDINARY)
      .then(data => {
        setPosts(data);
      });
  }

  const selectedClub = userClubs.filter(club => club.id === selectedClubId)[0] ?? null;

  return (
      //<ClubDetailScreen></ClubDetailScreen>
    <Container>
      <TopBarContainer>
        <CSText fontType={FontType.BOLD} fontSize={24}>
          My Clubs
        </CSText>
      </TopBarContainer>
      <ContentArea>
        <ScrollArea contentContainerStyle={{ rowGap: 6 }}>
          <ClubSelectBar rootNavigation={rootNavigation} clubList={userClubs} selectedClubId={selectedClubId} setSelectedClubId={setSelectedClubId} />
          {selectedClub && announcementPosts.map(post => {
            return <FeedPost rootNavigation={rootNavigation} post={post} club={selectedClub} />
          })}
          {selectedClub && posts.map(post => {
            return <FeedPost rootNavigation={rootNavigation} post={post} club={selectedClub} />
          })}
        </ScrollArea>
        <FloatingCreatePost onPress={() => rootNavigation.navigate('CreatePost')}>
          <WithLocalSvg asset={require("../../assets/icons/ic_stylus.svg")} width={32} height={32} />
        </FloatingCreatePost>
      </ContentArea>
    </Container>
  );
};

export default MyClubsScreen;
