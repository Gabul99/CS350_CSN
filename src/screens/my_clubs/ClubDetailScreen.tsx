import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SubscribeTopBar from "../../components/subscribed/SubscribeTopBar";
import FeedPost from "../../components/core/FeedPost";
import styled from "styled-components/native";
import Empty from "../../components/subscribed/Empty";
import { Colors } from "../../style/Colors";
import ClubDetailBar from "../../components/Club/ClubDetailBar";
import ClubDetailTopBar from "../../components/Club/ClubDetailTopBar";

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

const ClubDetailScreen = ({ navigation, rootNavigation }: Props) => {

  return (
    <Container>
      {/* <ClubDetailTopBar /> */}
			<ScrollArea contentContainerStyle={{rowGap: 6}}>
				<ClubDetailBar></ClubDetailBar>
				<FeedPost />
				<FeedPost />
				<FeedPost />
			</ScrollArea>
    </Container>
  );
};

export default ClubDetailScreen;
