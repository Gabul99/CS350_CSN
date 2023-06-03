import React, { useState } from "react";
import { Button } from "react-native";
import CSText, { FontType } from "../core/CSText";
import { CalendarState } from "../../screens/calendar/CalendarScreen";
import { WithLocalSvg } from "react-native-svg";
import styled from "styled-components/native";

interface Props {
  state: CalendarState;
  setState: (value: CalendarState) => void;
}

const StyleButton = styled.TouchableOpacity<{ fill: string, border?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 158px;
  padding: 0 6px;
  border: 1px solid ${props => props.border ? props.border : 'transparent'};
  background: ${props => props.fill};
  border-radius: 5px;
`;

const StyleView = styled.View`
flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const CalendarStateToggle = ({ state, setState }: Props) => {

  const stateHandler = () => {
    if (state === CalendarState.JOINED) {
      setState(CalendarState.SUBSCRIBED);
    }
    if (state === CalendarState.SUBSCRIBED) {
      setState(CalendarState.MARKED);
    }
    if (state === CalendarState.MARKED) {
      setState(CalendarState.JOINED);
    }
  }

  return (
    <>
      {
        state === CalendarState.JOINED && <StyleButton fill='#2D4D52' onPress={stateHandler}>
          <StyleView>

            <CSText fontType={FontType.MEDIUM} fontSize={20} color='#FFFFFF'>Joined</CSText>
          </StyleView>
          <WithLocalSvg asset={require("../../assets/icons/ic_navigate_next_white.svg")} width={24} height={24} fill='#FFFFFF' />
        </StyleButton>
      }
      {
        state === CalendarState.SUBSCRIBED && <StyleButton fill='#FFFFFF' border='#2D4D52' onPress={stateHandler}>
          <StyleView>
            <CSText fontType={FontType.MEDIUM} fontSize={20} color='#2D4D52'>Subscribed</CSText>
          </StyleView>
          <WithLocalSvg asset={require("../../assets/icons/ic_navigate_next.svg")} width={24} height={24} fill='#2D4D52' />
        </StyleButton>
      }
      {
        state === CalendarState.MARKED && <StyleButton fill='#3DECAD' onPress={stateHandler}>
          <StyleView>
            <CSText fontType={FontType.MEDIUM} fontSize={20} color='#282828'>Marked</CSText>
          </StyleView>
          <WithLocalSvg asset={require("../../assets/icons/ic_navigate_next.svg")} width={24} height={24} fill='#282828' />
        </StyleButton>
      }
    </>
  );
};
