import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";

interface Props {
  month: number;
  year: number;
  moveToPreviousMonth: (month: number) => void;
  moveToNextMonth: (month: number) => void;
  moveToSpecificYearAndMonth: (year: number, month: number) => void;
}

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #E0EBED;
`

function Header({ month, year, moveToPreviousMonth, moveToNextMonth, moveToSpecificYearAndMonth }: Props) {
  return (
    <HeaderContainer >
      <TouchableOpacity
        onPress={() => { moveToPreviousMonth(month) }}
      >
        <WithLocalSvg asset={require("../../assets/icons/ic_arrow_left.svg")} width={48} height={48} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <CSText fontSize={36} fontType={FontType.BOLD}>{year}. {month}</CSText>
      </View>
      <TouchableOpacity
        onPress={() => { moveToNextMonth(month) }}
      >
        <WithLocalSvg asset={require("../../assets/icons/ic_arrow_right.svg")} width={48} height={48} />
      </TouchableOpacity>

    </HeaderContainer>
  );
}

export default Header;
