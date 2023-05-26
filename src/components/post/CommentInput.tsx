import React, { useState } from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import { WithLocalSvg } from "react-native-svg";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from "react-native-screens/native-stack";

const Container = styled.View`
  width: 100%;
  height: 64px;
  padding: 14px;
  background-color: ${Colors.WHITE100};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.04);
  gap: 8px;
  flex-shrink: 0;
`;

const CommentTextInput = styled.TextInput`
  flex-grow: 1;
  background-color: #F5F8F9;
  height: 36px;
  padding: 0 16px;
`;

const UploadIcon = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
`;

const CommentInput = () => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={48}>
      <Container>
        <CommentTextInput value={inputValue} placeholder={"Add Comments..."}
                          onChangeText={(value) => setInputValue(value)} />
        <UploadIcon>
          <WithLocalSvg asset={require("../../assets/icons/ic_arrow_up.svg")} width={32} height={32} fill={Colors.BLACK100} />
        </UploadIcon>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default CommentInput;
