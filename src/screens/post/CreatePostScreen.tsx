import React, { useState } from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import CSText, { FontType } from "../../components/core/CSText";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import BottomToolBar from "../../components/post/BottomToolBar";
import CsDropdown from "../../components/core/CSDropdown";

const Container = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
`;

const TopBarContainer = styled.View`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  padding: 0 16px;
`;

const ContentArea = styled.View`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Contents = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 18px;
  background-color: ${Colors.WHITE100};
  gap: 16px;
`;

const TextArea = styled.TextInput`
  width: 100%;
  height: 180px;
  background-color: #F5F9F9;
`;

interface Props {
  navigation: any;
}

const CreatePostScreen = ({ navigation }: Props) => {
  const [isPublic, setPublic] = useState<boolean>(true);
  const [contentText, setContentText] = useState<string>('');

  return (
    <Container>
      <TopBarContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <WithLocalSvg asset={require("../../assets/icons/ic_arrow_back.svg")} width={28} height={28} />
        </TouchableOpacity>
        <View style={{ marginRight: "auto" }}>
          <CSText fontType={FontType.BOLD} fontSize={24}>
            Create Post
          </CSText>
        </View>
      </TopBarContainer>
      <ContentArea>
        <Contents>
          <CsDropdown title={'Clubs'} />
          <CSText fontType={FontType.BOLD} fontSize={20}>
            Content
          </CSText>
          <TextArea value={contentText} onChangeText={text => setContentText(text)} multiline={true} style={{padding: 8}} />
        </Contents>
      </ContentArea>
      <BottomToolBar isPublic={isPublic} setPublic={setPublic} />
    </Container>
  );
};

export default CreatePostScreen;
