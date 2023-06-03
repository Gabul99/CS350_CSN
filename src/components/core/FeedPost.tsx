import React from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "./CSText";
import ImageSliderView from "./ImageSlider";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import PostInfoDto from "../../model/PostInfoDto";
import ClubInfoDto from "../../model/ClubInfoDto";

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.View`
  width: 100%;
  padding: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ImagePlace = styled.View`
  width: 32px;
  height: 32px;
  background-color: lightgray;
  border-radius: 16px;
  overflow: hidden;
`;

const PostInfoArea = styled.View`
  display: flex;
  flex-direction: column;
`;

const TouchablePostDescriptionArea = styled.TouchableOpacity`
  width: 100%;
  padding: 0 18px 12px 18px;
`;

const PostDescriptionArea = styled.View`
  width: 100%;
  padding: 0 18px 12px 18px;
`;

const LikeCommentBar = styled.View`
  width: 100%;
  padding: 8px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SmallButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

interface Props {
  rootNavigation?: any;
  post: PostInfoDto;
  club: ClubInfoDto;
}

const FeedPost = ({ rootNavigation, post, club }: Props) => {
  return (
    <Container>
      <Header>
        <ImagePlace />
        <PostInfoArea>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>{club.clubname}</CSText>
          <CSText fontType={FontType.REGULAR} color={Colors.GREEN_SUB_TEXT} fontSize={14}>11 min ago</CSText>
        </PostInfoArea>
      </Header>
      {!!rootNavigation ?
        <TouchablePostDescriptionArea onPress={() => {
          if (rootNavigation) rootNavigation.navigate("PostDetail", {post: post, club: club});
        }}>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>{post.content}</CSText>
        </TouchablePostDescriptionArea>
        :
        <PostDescriptionArea>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>{post.content}</CSText>
        </PostDescriptionArea>
      }
      {post.imageUrls.length > 0 &&
      <ImageSliderView imageList={post.imageUrls} />
      }
      <LikeCommentBar>
        <SmallButton>
          <WithLocalSvg asset={require("../../assets/icons/ic_favorite.svg")} width={16} height={16} />
          <CSText fontType={FontType.REGULAR} fontSize={14}>
            {post.likeCount}
          </CSText>
        </SmallButton>
        <SmallButton>
          <WithLocalSvg asset={require("../../assets/icons/ic_chat_bubble.svg")} width={16} height={16} />
          <CSText fontType={FontType.REGULAR} fontSize={14}>
            {post.commentCount}
          </CSText>
        </SmallButton>
      </LikeCommentBar>
    </Container>
  );
};

export default FeedPost;
