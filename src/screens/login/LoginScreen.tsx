import React, { useState, useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import SubscribeTopBar from "../../components/subscribed/SubscribeTopBar";
import FeedPost from "../../components/core/FeedPost";
import styled from "styled-components/native";
import Empty from "../../components/subscribed/Empty";
import { Colors } from "../../style/Colors";
import { IntroView } from "../../components/login/IntroView";
import { login, logout, getProfile as getKakaoProfile, unlink } from '@react-native-seoul/kakao-login';
import { GlobalContext } from "../../network/GlobalContext";

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
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
  padding: 10px;
`;

const StyleButton = styled.Pressable`
  background-color: #FEE500;
  border-radius: 40px;
  border-width: 1px;
  width: 100%;
  height: 40px;
  padding: 10px 20px; 
  margin-top: 10px;
`;

const StyleText = styled.Text`
  text-align: center;
`

const LoginScreen = ({ navigation, rootNavigation, loginStatus, setLoginStatus }: Props) => {
  const [state, setState] = useState<SubscribedState>(SubscribedState.FEED);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [result, setResult] = useState<string>('');

  const { auth, setAuth } = useContext(GlobalContext);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));

      setAuth({
        authToken: token.accessToken,
        refreshToken: token.refreshToken,
      })
      setLoginStatus(true);
    } catch (err) {
      console.error('login err', err);
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();

      setResult(message);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();

      setResult(JSON.stringify(profile));
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();

      setResult(message);
    } catch (err) {
      console.error('signOut error', err);
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
        <StyleText >
          KAKAO Login
        </StyleText>
      </StyleButton>
      <StyleButton
        onPress={() => getProfile()}
      >
        <StyleText >
          Check Profile
        </StyleText>
      </StyleButton>
      <StyleButton
        onPress={() => unlinkKakao()}
      >
        <StyleText >
          Dettach Kakao
        </StyleText>
      </StyleButton>
      <StyleButton
        onPress={() => signOutWithKakao()}
      >
        <StyleText >
          KAKAO Logout
        </StyleText>
      </StyleButton>
    </Container>
  );
};

export default LoginScreen;
