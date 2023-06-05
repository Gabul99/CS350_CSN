import React from "react";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg";
import { SubscribedState } from "../../screens/subscribed/SubscribedScreen";
import { TouchableOpacity } from "react-native";
import { CalendarState } from "../../screens/calendar/CalendarScreen";
import { CalendarStateToggle } from "./CalendarStateToggle";

const Container = styled.View`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  padding: 0 16px;
`;

const Title = styled.Text`
  font-family: 'Helvetica Neue';
  font-size: 24px;
  font-weight: 700;
  margin-right: auto;
`;

interface Props {
  state: CalendarState;
  setState: (value: CalendarState) => void;
}

const CalendarTopBar = ({ state, setState, }: Props) => {
  return (
    <Container>
      <Title>Calendar</Title>
      <CalendarStateToggle state={state} setState={setState} />
    </Container>
  );
};

export default CalendarTopBar;
