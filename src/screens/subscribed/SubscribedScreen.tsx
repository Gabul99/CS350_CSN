import React from "react";
import { Text, View } from "react-native";
import SubscribeTopBar from "../../components/subscribed/SubscribeTopBar";
import FeedPost from "../../components/core/FeedPost";

interface Props {
  navigation: any;
  rootNavigation: any;
}

const SubscribedScreen = ({ navigation, rootNavigation }: Props) => {
  return (
    <View>
      <SubscribeTopBar />
      <FeedPost />
    </View>
  );
};

export default SubscribedScreen;
