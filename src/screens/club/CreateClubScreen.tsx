import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import CSText, { FontType } from "../../components/core/CSText";
import CSButton from "../../components/core/Button";
import { launchImageLibrary } from "react-native-image-picker";
import { v4 as uuidV4 } from "uuid";
import { useStorage } from "../../utils/useStorage";
import { StackActions } from "@react-navigation/native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

const ButtonArea = styled.View`
  width: 96px;
  height: 24px;
`;

const InfoArea = styled.View`
  width: 100%;
  padding: 16px;
  background-color: ${Colors.WHITE100};
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const ImagePlaceBig = styled.View`
  width: 96px;
  height: 96px;
  background-color: lightgray;
  border-radius: 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditImage = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  border: 2px solid ${Colors.GREEN_DARK};
  background-color: ${Colors.WHITE100};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClubInfoArea = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const TitleInput = styled.TextInput`
  font-family: "Helvetica Neue";
  font-weight: 700;
  color: ${Colors.BLACK100};
  background-color: ${Colors.LIGHTGREY};
  font-size: 20px;
  padding: 8px 12px;
  width: 100%;
`;

interface Props {
  navigation: any;
}

const CreateClubScreen = ({ navigation }: Props) => {
  const [name, onChangeName] = useState<string>("");
  const [imageUri, setImageUri] = useState<string>("");

  const {uploadAndGetURL, isLoading} = useStorage();

  const handleCreate = () => {
    navigation.dispatch(
      StackActions.replace('PostDetail')
    )
  }

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
        <ButtonArea>
          <CSButton color={Colors.GREEN_DEEP} text={"Create"} fill onPress={handleCreate} />
        </ButtonArea>
      </TopBarContainer>
      <InfoArea>
        <ClubInfoArea>
          <CSText fontType={FontType.MEDIUM} fontSize={14}>
            Club Name
        </CSText>
          <TitleInput
            onChangeText={onChangeName}
            value={name}
            placeholder={'Enter your club name'}
          />
        </ClubInfoArea>
      </InfoArea>
      <InfoArea>
        <CSText fontType={FontType.MEDIUM} fontSize={14}>
          Club Image
        </CSText>
        <ImagePlaceBig>
          {!!imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: 96, height: 96, borderRadius: 48 }} />
          ) : (
            <WithLocalSvg asset={require("../../assets/icons/ic_add_photo.svg")} width={28} height={28} />
          )}
          <EditImage>
            <TouchableOpacity onPress={() => {
              launchImageLibrary({mediaType: 'photo'}, res => {
                if (!res.assets) return;
                const asset = res.assets[0];
                const uuid = uuidV4();
                uploadAndGetURL(`club/${uuid}.png`, asset.uri)
                  .then(url => {
                    if (!url) return;
                    setImageUri(url);
                  })
              })
            }}>
              {!isLoading &&
              <WithLocalSvg asset={require("../../assets/icons/ic_stylus.svg")} width={18} height={18} />
              }
            </TouchableOpacity>
          </EditImage>
        </ImagePlaceBig>
      </InfoArea>
    </Container>
  );
};

export default CreateClubScreen;
