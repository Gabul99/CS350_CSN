/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubscribedScreen from "./src/screens/subscribed/SubscribedScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyClubsScreen from "./src/screens/my_clubs/MyClubsScreen";
import CalendarScreen from "./src/screens/calendar/CalendarScreen";
import { WithLocalSvg } from "react-native-svg";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black
          }
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark
          }
        ]}>
        {children}
      </Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.lighter}
      />
      <NavigationContainer>
        <Tab.Navigator initialRouteName={"Subscribed"} screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
          <Tab.Screen name={"Subscribed"} component={SubscribedScreen} options={{
            tabBarIcon: ({ focused }) => focused ?
              <WithLocalSvg asset={require("./src/assets/icons/ic_selected_subscribed.svg")} width={32} height={32} />
               :
              <WithLocalSvg asset={require("./src/assets/icons/ic_subscribed.svg")} width={32} height={32} />
          }} />
          <Tab.Screen name={"My Clubs"} component={MyClubsScreen} options={{
            tabBarIcon: ({ focused }) => focused ?
              <WithLocalSvg asset={require("./src/assets/icons/ic_selected_myclubs.svg")} width={32} height={32} />
              :
              <WithLocalSvg asset={require("./src/assets/icons/ic_myclubs.svg")} width={32} height={32} />
          }} />
          <Tab.Screen name={"Calendar"} component={CalendarScreen} options={{
            tabBarIcon: ({ focused }) => focused ?
              <WithLocalSvg asset={require("./src/assets/icons/ic_selected_calendar.svg")} width={32} height={32} />
              :
              <WithLocalSvg asset={require("./src/assets/icons/ic_calendar.svg")} width={32} height={32} />
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  }
});

export default App;
