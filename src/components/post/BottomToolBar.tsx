import React, { SetStateAction } from "react";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { useStorage } from "../../utils/useStorage";
import "react-native-get-random-values";
import { v4 as uuidV4 } from "uuid";

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
  const { isLoading, uploadAndGetURL } = useStorage();

  return (
    <Container>
      {!isLoading &&
      <TouchableOpacity onPress={() => {
        launchImageLibrary({ mediaType: "photo" }, res => {
          if (!res.assets) return;
          const asset = res.assets[0];
          console.log(asset, asset.uri, asset.base64);
          const uuid = uuidV4();
          uploadAndGetURL(`post/${uuid}.png`, asset.uri)
            .then(url => {
              if (!url) return;
              setImageList([...imageList, url]);
            });
        });
      }}>
        <WithLocalSvg asset={require("../../assets/icons/ic_add_photo.svg")} width={32} height={32} />
      </TouchableOpacity>
      }
      {isLoading &&
      <CSText fontType={FontType.REGULAR} fontSize={14} color={Colors.BLACK100}>
        Uploading...
      </CSText>
      }
      <PublicButtonArea onPress={() => setPublic(!isPublic)}>
        <WithLocalSvg
          asset={isPublic ? require("../../assets/icons/ic_check_box.svg") : require("../../assets/icons/ic_check_box_blank.svg")}
          width={32} height={32} />
        <CSText fontType={FontType.MEDIUM} fontSize={24} color={isPublic ? Colors.GREEN_DEEP : Colors.GREEN_DARK}>
          Public
        </CSText>
      </PublicButtonArea>
    </Container>
  );
};

export default BottomToolBar;
