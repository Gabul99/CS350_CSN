import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import ScheduleInfoDto from "../../model/ScheduleInfoDto";

interface Props {
  schedule?: any;
  rootNavigation: any;
}

const StyleTouchableOpacity = styled(TouchableOpacity) <{ bgColor?: string }>`
  width: 100%;
  height: 14px;
  background: ${(props) => props.bgColor};
  border-radius: 3px;
  text-align: center;
  align-items: center;
`;

const Schedule = ({ schedule, rootNavigation }: Props) => {
  return (<StyleTouchableOpacity onPress={() => rootNavigation.navigate('ScheduleDetail', { schedule: schedule })}
    bgColor='#BFE7B2' >
    <CSText fontSize={12} fontType={FontType.MEDIUM}>
      {schedule?.name ?? "No name"}
    </CSText>
  </StyleTouchableOpacity >)
}

export default Schedule;
