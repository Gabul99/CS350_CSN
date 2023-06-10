import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import CSText, { FontType } from "../../components/core/CSText";
import { WithLocalSvg } from "react-native-svg";
import { Alert, Image, Modal, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import BottomToolBar from "../../components/post/BottomToolBar";
import { v4 as uuidv4 } from "uuid";
import CsDropdown from "../../components/core/CSDropdown";
import ImageViewer from "react-native-image-zoom-viewer";
import DateSelector from "../../components/calendar/DateSelector";
import UserApi from "../../network/api/UserApi";
import CSButton from "../../components/core/Button";
import ClubsApi from "../../network/api/ClubsApi";
import ClubInfoDto from "../../model/ClubInfoDto";
import SchedulesApi from "../../network/api/SchedulesApi";

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
  justify-content: space-between;
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

const ButtonArea = styled.View`
  width: 96px;
  height: 24px;
`;

interface Props {
  navigation: any;
}

const CreateScheduleScreen = ({ navigation }: Props) => {
  const [userClubs, setUserClubs] = useState<ClubInfoDto[]>([]);
  const [isPublic, setPublic] = useState<boolean>(true);
  const [nameText, setNameText] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedClubId, setSelectedClubId] = useState<number | null>(null);
  const [isImageViewerOpen, setImageViewOpen] = useState<boolean>(false);
  const [viewerStartIdx, setViewerStartIdx] = useState<number>(0);

  const [isNetworking, setNetworking] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    UserApi.getUserClubs(false)
      .then(async (data) => {
        let result = [];
        for (let idx in data) {
          const dto = await ClubsApi.getClubDetailByClubId(data[idx]);
          result.push(dto);
        }
        setUserClubs(result);
      });
  }, []);

  const handleCreate = () => {
    if (!selectedClubId || !nameText || !contentText) return;
    setNetworking(true);
    SchedulesApi.createSchedule({
      clubId: selectedClubId.toString(),
      authorId: '771f1dad-0df4-4552-9862-8ec8ab238e7f',
      name: nameText,
      description: contentText,
      startDttm: startDate.toString(),
      endDttm: endDate.toString(),
      isPublic,
      imageUrls: imageList
    })
      .then(() => {
        setNetworking(false);
        navigation.goBack();
      })
      .catch((e) => {
        setNetworking(false);
        Alert.alert("Fail to create", `Error: ${e.message}`);
      });
  }

  return (
    <Container>
      <TopBarContainer>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <WithLocalSvg asset={require("../../assets/icons/ic_arrow_back.svg")} width={28} height={28} />
          </TouchableOpacity>
          <View style={{ marginRight: "auto" }}>
            <CSText fontType={FontType.BOLD} fontSize={24}>
              Create Schedule
            </CSText>
          </View>
        </View>
        <ButtonArea>
          {!isNetworking &&
            <CSButton color={Colors.GREEN_DEEP} text={"Create"} fill onPress={handleCreate} />
          }
          {isNetworking &&
            <CSText fontType={FontType.REGULAR} fontSize={14}>
              Creating...
            </CSText>
          }
        </ButtonArea>
      </TopBarContainer>
      <ContentArea>
        <Contents>
          <View style={{ width: '100%', display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
            <CSText fontType={FontType.BOLD} fontSize={20}>
              Club
            </CSText>
            <View style={{ width: '75%' }}>
              <CsDropdown selectedId={selectedClubId} onSelect={setSelectedClubId}
                // @ts-ignore
                optionList={userClubs.map(user => {
                  return {
                    value: user.id,
                    label: user.clubname
                  };
                })} />
            </View>
          </View>
          <View style={{ width: '100%', display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: "center", zIndex: -5, }}>
            <CSText fontType={FontType.BOLD} fontSize={20}>
              Name
            </CSText>
            <TextInput value={nameText} onChangeText={text => setNameText(text)} style={{ width: '75%', padding: 8, borderRadius: 5, backgroundColor: '#F5F5F5' }} />
          </View>
          <View style={{ width: '100%', zIndex: -5, }}>
            <CSText fontType={FontType.BOLD} fontSize={20}>
              Time
            </CSText>
          </View>

          <View style={{ width: '100%', display: 'flex', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', zIndex: -5, }}>
            <DateSelector date={startDate} setDate={setStartDate} />
            <WithLocalSvg asset={require("../../assets/icons/ic_navigate_next.svg")} width={24} height={24} fill='#2D4D52' />
            <DateSelector date={endDate} setDate={setEndDate} />
          </View>
          <View style={{ zIndex: -5, gap: 16 }}>
            <CSText fontType={FontType.BOLD} fontSize={20}>
              Content
            </CSText>
            <TextArea value={contentText} onChangeText={text => setContentText(text)} multiline={true}
              style={{ padding: 8 }} />
          </View>
          <ScrollView horizontal contentContainerStyle={{ columnGap: 8 }}>
            {imageList.map((imageUri, idx) => <TouchableOpacity key={uuidv4()} onPress={() => {
              setViewerStartIdx(idx);
              setImageViewOpen(true);
            }}><Image source={{ uri: imageUri }} style={{ width: 120, height: 120 }} /></TouchableOpacity>)}
          </ScrollView>
        </Contents>
      </ContentArea>
      <BottomToolBar isPublic={isPublic} setPublic={setPublic} imageList={imageList} setImageList={setImageList} />
      <Modal visible={isImageViewerOpen} transparent={true}>
        <ImageViewer index={viewerStartIdx} onCancel={() => setImageViewOpen(false)} imageUrls={imageList.map(imageUrl => {
          return { url: imageUrl }
        })} enableSwipeDown={true} onSwipeDown={() => setImageViewOpen(false)} />
      </Modal>
    </Container>
  );
};

export default CreateScheduleScreen;
