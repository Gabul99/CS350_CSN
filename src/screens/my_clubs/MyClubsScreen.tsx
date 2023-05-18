import React from "react";
import { Text } from "react-native";

interface Props {
  navigation: any;
  rootNavigation: any;
}

const MyClubsScreen = ({ navigation, rootNavigation }: Props) => {
  return (
    <Text>
      My clubs
    </Text>
  );
};

export default MyClubsScreen;
