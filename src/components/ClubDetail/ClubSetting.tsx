import React, { useState } from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import CSButton from "../core/Button";
import { TouchableOpacity, Image } from "react-native";
import { ClubDetailState } from "../../screens/my_clubs/ClubDetailScreen";
import { useStorage } from "../../utils/useStorage";
import "react-native-get-random-values";
import { v4 as uuidV4 } from "uuid";
import { launchImageLibrary } from "react-native-image-picker";

const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.View`
  width: 100%;
  padding: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ImagePlaceBig = styled.View`
  width: 96px;
  height: 96px;
  background-color: lightgray;
  border-radius: 48px;
  position: relative;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const ClubButtonArea = styled.View`
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 6px;
`;

const DetailDescriptionArea = styled.View`
  width: 100%;
  padding: 0 18px 12px 18px;
`;

const TitleInput = styled.TextInput`
  font-family: "Helvetica Neue";
  font-weight: 700;
  color: ${Colors.BLACK100};
  background-color: ${Colors.LIGHTGREY};
  font-size: 20px;
  padding-left: 18px;
`

const PropNameText = styled.Text`
  font-family: "Helvetica Neue";
  font-weight: 700;
  color: ${Colors.BLACK100};
  font-size: 12px;
  padding-left: 18px;
  padding-bottom: 6px;
  margin-top: 12px;
`

const DescInput = styled.TextInput`
  font-family: "Helvetica Neue";
  font-weight: 500;
  color: ${Colors.BLACK100};
  background-color: ${Colors.LIGHTGREY};
  font-size: 12px;
  padding-left: 18px;
  padding-right: 18px;
`

const JoinContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid ${Colors.LIGHTGREY};
  padding: 10px;
  gap: 8px;
`;

const Option = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

interface Props {
  state: ClubDetailState;
  setState: (value: ClubDetailState) => void;
}


const ClubSetting = ({state, setState}: Props) => {
  const [name, onChangeName] = React.useState('KAIST Puple');
  const [description, onChangeDesc] = React.useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at risus et lorem tincidunt');
  const [canApply, setCanApply] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const { isLoading, uploadAndGetURL } = useStorage();

  return (
    <Container>
      <Header>
        <ImagePlaceBig>
          {imageUri ? ( isLoading? (
            <PropNameText>Loading</PropNameText>
          ): (
            <Image source={{ uri: imageUri }} style={{ width: 96, height: 96, borderRadius: 48 }} />)
          ) : (
            <PropNameText>Empty</PropNameText>
          )}
          <EditImage>
            <TouchableOpacity onPress={() => {
              console.log('running');
              launchImageLibrary({ mediaType: "photo" }, res => {
              if (!res.assets) return;
              const asset = res.assets[0];
              console.log(asset, asset.uri, asset.base64);
              const uuid = uuidV4();
              uploadAndGetURL(`club/${uuid}.png`, asset.uri)
                .then(url => {
                  if (!url) return;
                  setImageUri(url);
                  console.log(imageUri);
                });
              });
            }}>
              <WithLocalSvg asset={require("../../assets/icons/ic_stylus.svg")} width={18} height={18} />
            </TouchableOpacity>
          </EditImage>
        </ImagePlaceBig>
        <ClubInfoArea>
          <PropNameText>Club Name</PropNameText>
          <TitleInput
            onChangeText={onChangeName}
            value={name}
          />
        </ClubInfoArea>
      </Header>
      <DetailDescriptionArea>
        <PropNameText>Description</PropNameText>
        <DescInput
          multiline
          onChangeText={onChangeDesc}
          value={description}
        />
        <PropNameText>Join</PropNameText>
        <JoinContainer>
          <Option>
            <TouchableOpacity onPress={() => setCanApply(!canApply)}>
              {canApply &&
              <>
                <WithLocalSvg asset={require("../../assets/icons/ic_check_box_filled.svg")} width={20} height={20} />
              </>
              }
              {!canApply &&
              <>
                <WithLocalSvg asset={require("../../assets/icons/ic_check_box_blank.svg")} width={20} height={20} />
              </>
              }
            </TouchableOpacity>
            <CSText fontType={FontType.REGULAR} fontSize={12}>Application Available</CSText>
          </Option>
          <Option>
            <CSButton
              fill={true}
              color={Colors.GREEN_DARK}
              text="View Applications"
              size={12}
              onPress={() => setState(ClubDetailState.APPLIST)}
            ></CSButton>
          </Option>
        </JoinContainer>
        <PropNameText>Members</PropNameText>
      </DetailDescriptionArea>
    </Container>
  );
};

export default ClubSetting;
