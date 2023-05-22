import React from "react";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
`;

const Ellipsis = styled.View`
  width: 12px;
  height: 12px;
  background-color: ${Colors.GREEN_DARK};
  overflow: hidden;
  border-radius: 6px;
`;

const FloatWrapper = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FloatIcons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
  padding-right: 6px;
`;

const FloatText = styled.View`
  padding: 6px 12px;
  background-color: ${Colors.WHITE100};
  border-radius: 24px;
  overflow: hidden;
  margin-top: 10px;
`;

const Empty = () => {
  return (
    <Container>
      <Content>
        <Ellipsis />
        <CSText fontType={FontType.MEDIUM} fontSize={20} color={Colors.GREEN_DARK}>
          No Subscribed Club
        </CSText>
        <Ellipsis />
      </Content>
      <FloatWrapper>
        <FloatIcons>
          <WithLocalSvg asset={require("../../assets/icons/ic_arrow_up.svg")} width={28} height={28} color={Colors.GREEN_DARK} />
          <WithLocalSvg asset={require("../../assets/icons/ic_arrow_up.svg")} width={28} height={28} color={Colors.GREEN_DARK} />
        </FloatIcons>
        <FloatText>
          <CSText fontType={FontType.REGULAR} fontSize={18} color={Colors.GREEN_DARK}>
            Try navigate / search clubs
          </CSText>
        </FloatText>
      </FloatWrapper>
    </Container>
  );
};

export default Empty;
