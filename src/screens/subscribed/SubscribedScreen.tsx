import React from "react";
import { ScrollView, Text, View } from "react-native";
import SubscribeTopBar from "../../components/subscribed/SubscribeTopBar";
import FeedPost from "../../components/core/FeedPost";
import styled from "styled-components/native";

interface Props {
  navigation: any;
  rootNavigation: any;
}

const Container = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollArea = styled.ScrollView`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SubscribedScreen = ({ navigation, rootNavigation }: Props) => {
  return (
    <Container>
      <SubscribeTopBar />
      <ScrollArea contentContainerStyle={{rowGap: 6}}>
        <FeedPost />
        <FeedPost />
        <FeedPost />
      </ScrollArea>
    </Container>
  );
};

export default SubscribedScreen;
