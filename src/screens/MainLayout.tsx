import React from "react";
import SubscribedScreen from "./subscribed/SubscribedScreen";
import { WithLocalSvg } from "react-native-svg";
import MyClubsScreen from "./my_clubs/MyClubsScreen";
import CalendarScreen from "./calendar/CalendarScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const MainLayout = () => {
  return (
    <Tab.Navigator initialRouteName={"Subscribed"} screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tab.Screen name={"Subscribed"} component={SubscribedScreen} options={{
        tabBarIcon: ({ focused }) => focused ?
          <WithLocalSvg asset={require("../assets/icons/ic_selected_subscribed.svg")} width={32} height={32} />
          :
          <WithLocalSvg asset={require("../assets/icons/ic_subscribed.svg")} width={32} height={32} />
      }} />
      <Tab.Screen name={"My Clubs"} component={MyClubsScreen} options={{
        tabBarIcon: ({ focused }) => focused ?
          <WithLocalSvg asset={require("../assets/icons/ic_selected_myclubs.svg")} width={32} height={32} />
          :
          <WithLocalSvg asset={require("../assets/icons/ic_myclubs.svg")} width={32} height={32} />
      }} />
      <Tab.Screen name={"Calendar"} component={CalendarScreen} options={{
        tabBarIcon: ({ focused }) => focused ?
          <WithLocalSvg asset={require("../assets/icons/ic_selected_calendar.svg")} width={32} height={32} />
          :
          <WithLocalSvg asset={require("../assets/icons/ic_calendar.svg")} width={32} height={32} />
      }} />
    </Tab.Navigator>
  );
};

export default MainLayout;
