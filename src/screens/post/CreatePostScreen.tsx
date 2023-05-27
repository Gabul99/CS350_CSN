import React, { useState } from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import CSText, { FontType } from "../../components/core/CSText";
import { WithLocalSvg } from "react-native-svg";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
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
  const [contentText, setContentText] = useState<string>("");
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedClubId, setSelectedClubId] = useState<number | null>(null);

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
          <View style={{ width: '100%', display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
            <CSText fontType={FontType.BOLD} fontSize={20}>
              Club
            </CSText>
            <View style={{width: '75%'}}>
              <CsDropdown selectedId={selectedClubId} onSelect={setSelectedClubId}
                          optionList={[{ value: 0, label: "hihi" }, { value: 1, label: "hihihi" }]} />
            </View>
          </View>
          <View style={{ zIndex: -5, gap: 16 }}>
            <CSText fontType={FontType.BOLD} fontSize={20}>
              Content
            </CSText>
            <TextArea value={contentText} onChangeText={text => setContentText(text)} multiline={true}
                      style={{ padding: 8 }} />
          </View>
          <ScrollView horizontal contentContainerStyle={{ columnGap: 8 }}>
            {imageList.map(imageUri => <Image source={{ uri: imageUri }} style={{ width: 120, height: 120 }} />)}
          </ScrollView>
        </Contents>
      </ContentArea>
      <BottomToolBar isPublic={isPublic} setPublic={setPublic} imageList={imageList} setImageList={setImageList} />
    </Container>
  );
};

export default CreatePostScreen;
