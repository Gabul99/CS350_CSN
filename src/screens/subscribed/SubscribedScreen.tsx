import React from "react";
import { Text, View } from "react-native";

interface Props {
  navigation: any;
  rootNavigation: any;
}

const SubscribedScreen = ({ navigation, rootNavigation }: Props) => {
  return (
    <View>
      <Text>
        Subscribed
      </Text>
    </View>
  );
};

export default SubscribedScreen;
