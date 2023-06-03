import React, { useState } from "react";
import { Text } from "react-native";
import CalendarTopBar from "../../components/calendar/CalendarTopBar";
import styled from "styled-components/native";

import { Colors } from "../../style/Colors";
import Calendar from "../../components/calendar/Calendar";

import { WithLocalSvg } from "react-native-svg";
export enum CalendarState {
  JOINED,
  SUBSCRIBED,
  MARKED,
}

interface Props {
  navigation: any;
  rootNavigation: any;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.GREEN_BACKGROUND};
`;

const FloatingCreateSchedule = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  bottom: 8px;
  right: 8px;
  background-color: ${Colors.GREEN_DEEP};
  display: flex;
  align-items: center;
  justify-content: center;
`

const CalendarScreen = ({ navigation, rootNavigation }: Props) => {
  const [state, setState] = useState<CalendarState>(CalendarState.JOINED);

  return (
    <Container>
      <CalendarTopBar state={state} setState={setState} />
      <Calendar rootNavigation={rootNavigation} />
      <FloatingCreateSchedule onPress={() => rootNavigation.navigate('CreateSchedule')}>
        <WithLocalSvg asset={require("../../assets/icons/ic_stylus.svg")} width={32} height={32} />
      </FloatingCreateSchedule>
    </Container>
  );
};

export default CalendarScreen;
