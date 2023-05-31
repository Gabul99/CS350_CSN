import React from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";

const Container = styled.View`
  width: 54px;
  height: 54px;
  position: relative;
`;

const TouchableArea = styled.TouchableOpacity`
  width: 54px;
  height: 54px;
  position: relative;
`;

const Background = styled.View`
  position: absolute;
  width: 54px;
  height: 54px;
  border-radius: 27px;
  background-color: ${Colors.GREEN_BACKGROUND};
`;

const SelectedIndicator = styled.View`
  position: absolute;
  width: 54px;
  height: 54px;
  border-radius: 27px;
  border: 7px solid ${Colors.GREEN_DARK};
`;

const Star = styled.TouchableOpacity`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${Colors.GREEN_DEEP};
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Setting = styled.TouchableOpacity`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${Colors.GREEN_DARK};
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircularClubBadge = () => {
  const isSelected = false;
  const isStarred = true;
  const isAdmin = false;

  return (
    <Container>
      <TouchableArea>
        <Background />
        {isSelected &&
        <SelectedIndicator />
        }
      </TouchableArea>
      {isStarred &&
      <Star>
        <WithLocalSvg asset={require("../../assets/icons/ic_star.svg")} width={12} height={12} />
      </Star>
      }
      {isAdmin &&
      <Setting>
        <WithLocalSvg asset={require("../../assets/icons/ic_settings_filled.svg")} width={12} height={12} />
      </Setting>
      }
    </Container>
  );
};

export default CircularClubBadge;
