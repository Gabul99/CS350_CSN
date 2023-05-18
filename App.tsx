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
          <Root.Screen name={'Main'} component={MainLayout} options={{headerShown: false}} />
        </Root.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
