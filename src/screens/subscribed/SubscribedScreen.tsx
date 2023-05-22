import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SubscribeTopBar from "../../components/subscribed/SubscribeTopBar";
import FeedPost from "../../components/core/FeedPost";
import styled from "styled-components/native";
import Empty from "../../components/subscribed/Empty";
import { Colors } from "../../style/Colors";
import ClubList from "./ClubList";

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

  return (
    <Container>
      <SubscribeTopBar state={state} setState={setState} searchKeyword={searchKeyword}
                       setSearchKeyword={setSearchKeyword} />
      {state === SubscribedState.FEED &&
      <>
        <Content>
          <Empty />
        </Content>
        {/*<ScrollArea contentContainerStyle={{rowGap: 6}}>*/}
        {/*  <FeedPost />*/}
        {/*  <FeedPost />*/}
        {/*  <FeedPost />*/}
        {/*</ScrollArea>*/}
      </>
      }
      {state !== SubscribedState.FEED &&
        <ClubList />
      }
    </Container>
  );
};

export default SubscribedScreen;
