import React from "react";
import styled from "styled-components/native";
import { Colors } from "../../style/Colors";
import CSText, { FontType } from "../core/CSText";
import { WithLocalSvg } from "react-native-svg";
import CommentEntity from "../../model/CommentEntity";
import { fromNow } from "../../utils/dateFormat";

const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 18px;
  background-color: ${Colors.WHITE100};
  gap: 12px;
`;

const InfoBar = styled.View`
  width: 100%;
  height: 24px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const DeleteIcon = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-left: auto;
`;

interface Props {
  comment: CommentEntity;
}

const Comment = ({ comment }: Props) => {
  const isMyComment = true;

  return (
    <Container>
      <InfoBar>
        <CSText fontType={FontType.BOLD} fontSize={14}>
          {comment.authorname}
        </CSText>
        <CSText fontType={FontType.MEDIUM} fontSize={14} color={Colors.GREEN_SUB_TEXT}>
          {fromNow(comment.createdAt)}
        </CSText>
        {isMyComment &&
        <DeleteIcon>
          <WithLocalSvg asset={require("../../assets/icons/ic_delete.svg")} width={20} height={20} />
        </DeleteIcon>
        }
      </InfoBar>
      <CSText fontType={FontType.REGULAR} fontSize={14}>
        {comment.content}
      </CSText>
    </Container>
  );
};

export default Comment;
