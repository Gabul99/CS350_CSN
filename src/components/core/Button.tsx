import styled from "styled-components/native";
import CSText, { FontType } from "./CSText";
import { Colors } from "../../style/Colors";
import { ReactElement, ReactNode } from "react";

const StyledButton = styled.View`
  display: flex;
  align-items: center;
  justify-contents: center;
  border: 2px solid;
  border-radius: 3px;
  box-sizing: border-box;
  flex-grow: 1;
`;

interface Props {
  size?: string;
  fill?: boolean;
  color: string;
  text: string;
  children?: ReactNode;
}

const CSButton = ({size = 'SMALL', fill = false, color, text, children}: Props) => {
  const getFillColor = (fill: boolean, color: string) => {
    if(fill) return color;
    return Colors.WHITE100;
  };
  const getStrokeColor = (fill: boolean, color: string) => {
    if(fill) return color;
    return color;
  }
  const getFontColor = (fill: boolean, color: string) => {
    if(fill){
      switch (color) {
        case Colors.GREEN_DEEP:
          return Colors.BLACK100;
        case Colors.GREEN_DARK:
          return Colors.WHITE100;
      }
    }
    switch (color) {
      case Colors.GREEN_BACKGROUND:
        return Colors.GREEN_DARK;
      case Colors.GREEN_DARK:
        return Colors.GREEN_DARK;
        case Colors.GREEN_DEEP:
        return Colors.GREEN_DARK;
    }
  }
  return <StyledButton style={{borderColor: getStrokeColor(fill, color), backgroundColor: getFillColor(fill, color)}}>
      <CSText fontType={FontType.MEDIUM} color={getFontColor(fill, color)} fontSize={14}>{text}</CSText>
      {children}
    </StyledButton>
};

export default CSButton;
