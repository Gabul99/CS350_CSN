import React from "react";
import { Text } from "react-native";

interface Props {
  navigation: any;
  rootNavigation: any;
}

const CalendarScreen = ({ navigation }: Props) => {
  return (
    <Text>
      Calendars
    </Text>
  );
};

export default CalendarScreen;
