import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";

export interface ISchedule {
  clubId: string;
  authorId: string;
  name: string;
  description: string;
  startDttm: Date;
  endDttm: Date;
  isPublic: boolean;
}

interface Props {
  schedule?: ISchedule;
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
  return (<StyleTouchableOpacity onPress={() => rootNavigation.navigate('ScheduleDetail')}
    bgColor='#BFE7B2' >
    <CSText fontSize={12} fontType={FontType.MEDIUM}>
      {schedule?.name ?? "No name"}
    </CSText>
  </StyleTouchableOpacity >)
}

export default Schedule;
