import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import SubscribedScreen from "./subscribed/SubscribedScreen";
import { WithLocalSvg } from "react-native-svg";
import MyClubsScreen from "./my_clubs/MyClubsScreen";
import CalendarScreen from "./calendar/CalendarScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styled from 'styled-components/native';
import { Colors } from "../style/Colors";

import { login, logout, getProfile as getKakaoProfile, unlink } from '@react-native-seoul/kakao-login';
import { IntroView } from "../components/login/IntroView";
import LoginScreen from "./login/LoginScreen";

const Tab = createBottomTabNavigator();

interface Props {
  navigation: any;
}

const Container = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
`;


const StyleButton = styled.Pressable`
  backgroundColor: '#FEE500';
  borderRadius: 40;
  borderWidth: 1;
  width: 250;
  height: 40;
  paddingHorizontal: 20;
  paddingVertical: 10;
  marginTop: 10;
`;

const StyleText = styled.Text`
  text-align: center;
`

const MainLayout = ({ navigation: rootNavigation }: Props) => {

  const [result, setResult] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  if (!loginStatus) {
    return (
      <Tab.Navigator initialRouteName={"Login"} screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <Tab.Screen name={"Login"} children={({ navigation, }) => <LoginScreen navigation={navigation} rootNavigation={rootNavigation} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />}
        />
      </Tab.Navigator >
    )
  }
  else {

    return (
      <Tab.Navigator initialRouteName={"Subscribed"} screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <Tab.Screen name={"Subscribed"} children={({ navigation }) => <SubscribedScreen navigation={navigation} rootNavigation={rootNavigation} />} options={{
          tabBarIcon: ({ focused }) => focused ?
            <WithLocalSvg asset={require("../assets/icons/ic_selected_subscribed.svg")} width={32} height={32} />
            :
            <WithLocalSvg asset={require("../assets/icons/ic_subscribed.svg")} width={32} height={32} />
        }} />
        <Tab.Screen name={"My Clubs"} children={({ navigation }) => <MyClubsScreen navigation={navigation} rootNavigation={rootNavigation} />} options={{
          tabBarIcon: ({ focused }) => focused ?
            <WithLocalSvg asset={require("../assets/icons/ic_selected_myclubs.svg")} width={32} height={32} />
            :
            <WithLocalSvg asset={require("../assets/icons/ic_myclubs.svg")} width={32} height={32} />
        }} />
        <Tab.Screen name={"Calendar"} children={({ navigation }) => <CalendarScreen navigation={navigation} rootNavigation={rootNavigation} />} options={{
          tabBarIcon: ({ focused }) => focused ?
            <WithLocalSvg asset={require("../assets/icons/ic_selected_calendar.svg")} width={32} height={32} />
            :
            <WithLocalSvg asset={require("../assets/icons/ic_calendar.svg")} width={32} height={32} />
        }} />
      </Tab.Navigator>
    );
  }
};

export default MainLayout;
