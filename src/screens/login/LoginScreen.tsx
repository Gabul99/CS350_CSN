import React, { useState, useContext } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import SubscribeTopBar from "../../components/subscribed/SubscribeTopBar";
import FeedPost from "../../components/core/FeedPost";
import styled from "styled-components/native";
import Empty from "../../components/subscribed/Empty";
import { Colors } from "../../style/Colors";
import { IntroView } from "../../components/login/IntroView";
import { login, logout, getProfile as getKakaoProfile, unlink } from '@react-native-seoul/kakao-login';
import { GlobalContext } from "../../network/GlobalContext";
import CSText, { FontType } from "../../components/core/CSText";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum SubscribedState {
  FEED,
  SEARCH,
  NAVIGATE,
}

interface Props {
  navigation: any;
  rootNavigation: any;
  loginStatus: boolean;
  setLoginStatus: (arg0: boolean) => void;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
  padding: 10px;
`;

const StyleButton = styled.Pressable`
  align-items: center;
  background-color: #FEE500;
  border-radius: 40px;
  border-width: 1px;
  width: 100%;
  height: 40px;
  padding: 10px 20px; 
  margin-top: 10px;
`;

const LoginScreen = ({ navigation, rootNavigation, loginStatus, setLoginStatus }: Props) => {
  const [state, setState] = useState<SubscribedState>(SubscribedState.FEED);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [result, setResult] = useState<string>('');

  const { auth, setAuth } = useContext(GlobalContext);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));

      const connect = await axios.get<{accessToken: string, refreshToken: string}>(`http://${Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'}:3000/auth/kakao/native`, {
        params: {
          code: token.accessToken,
        },
      })

      await AsyncStorage.setItem('accessToken', connect.data.accessToken);
      await AsyncStorage.setItem('refreshToken', connect.data.refreshToken);

      setAuth({
        authToken: connect.data.accessToken,
        refreshToken: connect.data.refreshToken,
      })
      setLoginStatus(true);
    } catch (err) {
      console.error('login err', err);
      const axiosError = err as AxiosError;
      console.log(axiosError.code, axiosError.message);
    }
  };

  return (

    <Container >
      <IntroView result={result} />
      <StyleButton
        onPress={() => {
          signInWithKakao();
        }}
      >
        <CSText fontType={FontType.MEDIUM} fontSize={16} >
          KAKAO Login
        </CSText>
      </StyleButton>
    </Container>
  );
};

export default LoginScreen;
