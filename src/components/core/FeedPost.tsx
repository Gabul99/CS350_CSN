import React from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "./CSText";
import ImageSliderView from "./ImageSlider";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";

const Container = styled.View`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.View`
  width: 100%;
  height: fit-content;
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
}

const FeedPost = ({ rootNavigation }: Props) => {
  return (
    <Container>
      <Header>
        <ImagePlace />
        <PostInfoArea>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>KAIST Puple</CSText>
          <CSText fontType={FontType.REGULAR} color={Colors.GREEN_SUB_TEXT} fontSize={14}>11 min ago</CSText>
        </PostInfoArea>
      </Header>
      {!!rootNavigation ?
        <TouchablePostDescriptionArea onPress={() => {
          if (rootNavigation) rootNavigation.navigate("PostDetail");
        }}>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>Lorem ipsum dolor sit amet,
            consectetur
            adipiscing elit. Donec at risus et lorem tincidunt</CSText>
        </TouchablePostDescriptionArea>
        :
        <PostDescriptionArea>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>Lorem ipsum dolor sit amet,
            consectetur
            adipiscing elit. Donec at risus et lorem tincidunt</CSText>
        </PostDescriptionArea>
      }
      <ImageSliderView />
      <LikeCommentBar>
        <SmallButton>
          <WithLocalSvg asset={require("../../assets/icons/ic_favorite.svg")} width={16} height={16} />
          <CSText fontType={FontType.REGULAR} fontSize={14}>
            14
          </CSText>
        </SmallButton>
        <SmallButton>
          <WithLocalSvg asset={require("../../assets/icons/ic_chat_bubble.svg")} width={16} height={16} />
          <CSText fontType={FontType.REGULAR} fontSize={14}>
            2
          </CSText>
        </SmallButton>
      </LikeCommentBar>
    </Container>
  );
};

export default FeedPost;
