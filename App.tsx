/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

import {
  Colors,
} from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import MainLayout from "./src/screens/MainLayout";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostDetailScreen from "./src/screens/post/PostDetailScreen";
import CreatePostScreen from "./src/screens/post/CreatePostScreen";
import CreateClubScreen from "./src/screens/club/CreateClubScreen";
import CreateScheduleScreen from "./src/screens/schedule/CreateScheduleScreen";
import ScheduleDetailScreen from "./src/screens/schedule/ScheduleDetailScreen";

const Root = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.lighter}
      />
      <NavigationContainer>
        <Root.Navigator initialRouteName={'Main'}>
          <Root.Screen name={'Main'} component={MainLayout} options={{ headerShown: false }} />
          <Root.Screen name={'PostDetail'} component={PostDetailScreen} options={{ headerShown: false }} />
          <Root.Screen name={'CreatePost'} component={CreatePostScreen} options={{ headerShown: false }} />
          <Root.Screen name={'ScheduleDetail'} component={ScheduleDetailScreen} options={{ headerShown: false }} />
          <Root.Screen name={'CreateSchedule'} component={CreateScheduleScreen} options={{ headerShown: false }} />
          <Root.Screen name={'CreateClub'} component={CreateClubScreen} options={{ headerShown: false }} />
        </Root.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
