import React, { SetStateAction } from "react";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import storage from '@react-native-firebase/storage';

const Container = styled.View`
  height: 72px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background-color: ${Colors.WHITE100};
`;

const PublicButtonArea = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

interface Props {
  isPublic: boolean;
  setPublic: (value: boolean) => void;
  imageList: string[];
  setImageList: (value: string[]) => void;
}

const BottomToolBar = ({ isPublic, setPublic, imageList, setImageList }: Props) => {

  const handleImageUpload = async (asset: Asset) => {
    if (!asset.uri) return;
    console.log('try to Upload...');
    const reference = storage().ref('test.png')
    await reference.putFile(asset.uri);
    console.log('UploadURL: ', await reference.getDownloadURL());
  }

  return (
    <Container>
      <TouchableOpacity onPress={() => {
        launchImageLibrary({mediaType: 'photo'}, res => {
          if (res.assets) handleImageUpload(res.assets[0]);
          setImageList(imageList.concat((res.assets ?? []).map(asset => asset.uri ?? "")));
        });
      }}>
        <WithLocalSvg asset={require("../../assets/icons/ic_add_photo.svg")} width={32} height={32} />
      </TouchableOpacity>
      <PublicButtonArea onPress={() => setPublic(!isPublic)}>
        <WithLocalSvg asset={isPublic ? require("../../assets/icons/ic_check_box.svg") : require("../../assets/icons/ic_check_box_blank.svg")} width={32} height={32} />
        <CSText fontType={FontType.MEDIUM} fontSize={24} color={isPublic ? Colors.GREEN_DEEP : Colors.GREEN_DARK}>
          Public
        </CSText>
      </PublicButtonArea>
    </Container>
  );
};

export default BottomToolBar;
