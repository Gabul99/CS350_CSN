import React, { useState } from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import CSText, { FontType } from "../../components/core/CSText";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import BottomToolBar from "../../components/post/BottomToolBar";

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

const Contents = styled.View`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

interface Props {
  navigation: any;
}

const CreatePostScreen = ({ navigation }: Props) => {
  const [isPublic, setPublic] = useState<boolean>(true);

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
      <Contents></Contents>
      <BottomToolBar isPublic={isPublic} setPublic={setPublic} />
    </Container>
  );
};

export default CreatePostScreen;
