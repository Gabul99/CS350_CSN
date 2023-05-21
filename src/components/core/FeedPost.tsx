import React from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "./CSText";
import ImageSliderView from "./ImageSlider";

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
  border-radius: 50%;
  overflow: hidden;
`;

const PostInfoArea = styled.View`
  display: flex;
  flex-direction: column;
`;

const PostDescriptionArea = styled.View`
  width: 100%;
  padding: 0 18px 12px 18px;
`;

const FeedPost = () => {
  return (
    <Container>
      <Header>
        <ImagePlace />
        <PostInfoArea>
          <CSText fontType={FontType.REGULAR} color={"black"} fontSize={14}>KAIST Puple</CSText>
          <CSText fontType={FontType.REGULAR} color={"#97AAAD"} fontSize={14}>11 min ago</CSText>
        </PostInfoArea>
      </Header>
      <PostDescriptionArea>
      <CSText fontType={FontType.REGULAR} color={"black"} fontSize={14}>Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Donec at risus et lorem tincidunt</CSText>
      </PostDescriptionArea>
      <ImageSliderView />
    </Container>
  );
};

export default FeedPost;
