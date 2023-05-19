import React from "react";
import { Text, View } from "react-native";
import SubscribeTopBar from "../../components/subscribed/SubscribeTopBar";

interface Props {
  navigation: any;
  rootNavigation: any;
}

const SubscribedScreen = ({ navigation, rootNavigation }: Props) => {
  return (
    <View>
      <SubscribeTopBar />
      <Text>
        Subscribed
      </Text>
    </View>
  );
};

export default SubscribedScreen;
