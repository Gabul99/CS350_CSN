import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "./CSText";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import DropdownPicker, { ValueType } from "react-native-dropdown-picker";

const Container = styled.View`
  position: relative;
  width: 100%;
`;

const Header = styled.TouchableOpacity`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${Colors.WHITE100};
  border: 1px solid #E0EBED;
  padding: 0 12px;
`;

const OptionContainer = styled.View`
  position: absolute;
  top: 40px;
  width: 100%;
  height: 160px;
  background-color: ${Colors.GREEN_DEEP};
  z-index: 100;
`;

interface Option<T> {
  value: T;
  label: string;
}

interface Props<T> {
  selectedId: T | null;
  onSelect: Dispatch<SetStateAction<T | null>>;
  optionList: Option<T>[];
}

const CsDropdown = <T extends ValueType>({ selectedId, onSelect, optionList }: Props<T>) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Container>
      <DropdownPicker open={isOpen} setOpen={setOpen} value={selectedId} setValue={onSelect} items={optionList} containerStyle={{width: '100%'}} />
    </Container>
  );
};

export default CsDropdown;
