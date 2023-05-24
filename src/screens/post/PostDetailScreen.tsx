import React from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import { ScrollView, TouchableOpacity } from "react-native";
import CSText, { FontType } from "../../components/core/CSText";
import FeedPost from "../../components/core/FeedPost";
import Comment from "../../components/post/Comment";
import CommentInput from "../../components/post/CommentInput";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
`;

const TopBarContainer = styled.View`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.WHITE100};
  gap: 12px;
`;

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface Props {
  navigation: any;
}

const PostDetailScreen = ({ navigation }: Props) => {
  return (
    <Container>
      <TopBarContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <WithLocalSvg asset={require("../../assets/icons/ic_arrow_back.svg")} width={28} height={28} />
        </TouchableOpacity>
        <CSText fontType={FontType.BOLD} fontSize={24}>
          Post
        </CSText>
      </TopBarContainer>
      <ScrollArea contentContainerStyle={{rowGap: 8}}>
        <FeedPost />
        <Comment />
      </ScrollArea>
      <CommentInput />
    </Container>
  );
};

export default PostDetailScreen;
