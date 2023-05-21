import styled from "styled-components/native";
import { ReactElement, ReactNode } from "react";

export enum FontType {
  BOLD,
  REGULAR,
}

const StyledText = styled.Text<{size: string, fontWeight: string, color: string}>`
  font-size: ${props => props.size};
  font-family: "Helvetica Neue";
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
`;

interface Props {
  fontType: FontType;
  color: string;
  fontSize: number;
  children: ReactNode;
}

const CSText = ({fontType, color, fontSize, children}: Props) => {
  const getFontWeight = (type: FontType) => {
    switch (type) {
      case FontType.BOLD:
        return '700';
      case FontType.REGULAR:
        return '500';
    }
  }

  return <StyledText fontWeight={getFontWeight(fontType)} color={color} size={`${fontSize}px`}>{children}</StyledText>
}

export default CSText;
