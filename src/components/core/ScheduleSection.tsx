import React, { useEffect } from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "./CSText";
import ImageSliderView from "./ImageSlider";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity, View } from "react-native";
import ScheduleInfoDto from "../../model/ScheduleInfoDto";
import { fromNow } from "../../utils/dateFormat";
import SchedulesApi from "../../network/api/SchedulesApi";

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

const ImagePlace = styled.View`
  width: 32px;
  height: 32px;
  background-color: lightgray;
  border-radius: 16px;
  overflow: hidden;
`;

const PostInfoArea = styled.View`
  display: flex;
  flex-direction: column;
`;

const TouchablePostDescriptionArea = styled.TouchableOpacity`
  width: 100%;
  padding: 0 18px 12px 18px;
`;

const PostDescriptionArea = styled.View`
  width: 100%;
  padding: 0 18px 12px 18px;
`;

const MarkButton = styled.TouchableOpacity<{ marked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80;
  height: 40;
  background: ${(props) => props.marked ? '#3DECAD' : 'transparent'}
  border: 2px solid #3DECAD;
  border-radius: 5px;
`


interface Props {
  rootNavigation?: any;
  schedule: ScheduleInfoDto;
}

const ScheduleSection = ({ rootNavigation, schedule }: Props) => {

  const [marked, setMarked] = React.useState(false);
  const [refreshCount, setRefreshCount] = React.useState(0);

  const handleMark = async () => {
    if (marked) {
      const res = await SchedulesApi.scrabScheduleById(schedule.id)
      setRefreshCount(refreshCount + 1)
    } else {
      const res = await SchedulesApi.unscrabScheduleById(schedule.id)
      setRefreshCount(refreshCount + 1)
    }
  }

  useEffect(() => {
    //TODO check mark
    const checkMark = async () => {
      const userSchedules = await SchedulesApi.getSchedulesUser();
      const marked = userSchedules.some((userSchedule: ScheduleInfoDto) => userSchedule.id === schedule.id);
      setMarked(marked);
    }
    checkMark()
  }, [schedule.id, refreshCount])

  return (
    <Container>
      <Header>
        <ImagePlace />
        <PostInfoArea>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>{schedule.authorName}</CSText>
          <CSText fontType={FontType.REGULAR} color={Colors.GREEN_SUB_TEXT} fontSize={14}>{fromNow(schedule.createdAt)}</CSText>
        </PostInfoArea>
      </Header>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingBottom: 18 }}>
        <View style={{ flexDirection: "column", alignItems: "baseline", justifyContent: 'flex-start' }}>
          <CSText fontSize={14} fontType={FontType.MEDIUM} >
            {schedule.name}
          </CSText>
          <CSText fontSize={10} fontType={FontType.REGULAR} >
            {schedule.startDttm.toString()} ~ {schedule.endDttm.toString()}
          </CSText>
        </View>
        <MarkButton
          onPress={() => {
            //TODO marking
            handleMark();
          }}
          marked={marked}
        >
          <CSText fontSize={20} fontType={FontType.REGULAR} color={'#1C1B1F'} >
            {marked ? 'Marked' : 'Mark'}
          </CSText>
        </MarkButton>
      </View>
      {!!rootNavigation ?
        <TouchablePostDescriptionArea onPress={() => {
          if (rootNavigation) rootNavigation.navigate("ScheduleDetail");
        }}>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>Lorem ipsum dolor sit amet,
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In placerat dapibus malesuada. Aliquam finibus varius quam. Duis dignissim lacus eu neque gravida, ac gravida mauris scelerisque. Duis consectetur magna id eros auctor, sed dictum est ullamcorper. Mauris sem est, commodo in orci consequat, tristique lacinia nibh. Integer mattis tempor aliquam. Curabitur eget lobortis dolor. Etiam eget diam ut ligula pulvinar euismod eu vel ex. Pellentesque egestas gravida sapien, id maximus metus semper vel. Pellentesque enim nisi, iaculis sit amet tristique eget, lobortis non ligula. Ut nec turpis hendrerit metus semper auctor eu vel turpis. Maecenas massa arcu, lacinia vel ante eget, accumsan consequat ex. Etiam congue iaculis velit quis hendrerit. Curabitur egestas arcu eget bibendum posuere.</CSText>
        </TouchablePostDescriptionArea>
        :
        <PostDescriptionArea>
          <CSText fontType={FontType.REGULAR} color={Colors.BLACK100} fontSize={14}>
            {schedule.description}
          </CSText>
        </PostDescriptionArea>
      }
      {/* <ImageSliderView /> */}
    </Container>
  );
};

export default ScheduleSection;
