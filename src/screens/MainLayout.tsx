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

const MainLayout = ({ navigation: rootNavigation }: Props) => {

  const [result, setResult] = useState<string>('');
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  if (!loginStatus) {
    return (
      <Tab.Navigator initialRouteName={"Login"} screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <Tab.Screen name={"Login"} children={({ navigation, }) => <LoginScreen navigation={navigation} rootNavigation={rootNavigation} loginStatus={loginStatus} setLoginStatus={setLoginStatus} />}
        //   options={{
        //   tabBarIcon: ({ focused }) => focused ?
        //     <WithLocalSvg asset={require("../assets/icons/ic_selected_subscribed.svg")} width={32} height={32} />
        //     :
        //     <WithLocalSvg asset={require("../assets/icons/ic_subscribed.svg")} width={32} height={32} />
        // }} 
        />
        {

          // <Container >
          //   <IntroView result={result} />
          //   <StyleButton
          //     onPress={() => {
          //       signInWithKakao();
          //     }}
          //   >
          //     <StyleText >
          //       카카오 로그인
          //     </StyleText>
          //   </StyleButton>
          //   <StyleButton
          //     onPress={() => getProfile()}
          //   >
          //     <StyleText >
          //       프로필 조회
          //     </StyleText>
          //   </StyleButton>
          //   <StyleButton
          //     onPress={() => unlinkKakao()}
          //   >
          //     <StyleText >
          //       링크 해제
          //     </StyleText>
          //   </StyleButton>
          //   <StyleButton
          //     onPress={() => signOutWithKakao()}
          //   >
          //     <StyleText >
          //       카카오 로그아웃
          //     </StyleText>
          //   </StyleButton>
          // </Container>
        }

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
