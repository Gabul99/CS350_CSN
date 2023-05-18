import React from "react";
import { Text, View } from "react-native";

interface Props {
  navigation: any;
}

const SubscribedScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>
        Subscribed
      </Text>
    </View>
  );
};

export default SubscribedScreen;
