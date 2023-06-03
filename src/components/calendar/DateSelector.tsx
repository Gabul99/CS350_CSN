import { useState } from "react";

import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import CSText, { FontType } from "../core/CSText";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  date: Date;
  setDate: (arg0: Date) => void;
}

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 45%;
  justify-content: space-between;
  padding: 6px 4px;
  align-items: center;
  background: #F5F5F5;
`;

const DateContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: flex-end;
`;

const TimeContainer = styled.View`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DateSelector = ({ date, setDate }: Props) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };


  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <Container onPress={showDatePicker}>
      <DateContainer >
        <CSText fontSize={12} fontType={FontType.REGULAR}>
          {date.toDateString()}
        </CSText>
        <CSText fontSize={12} fontType={FontType.REGULAR}>
          {date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }).split(' ')[1]}
        </CSText>

      </DateContainer>
      <TimeContainer>
        <CSText fontSize={18} fontType={FontType.REGULAR}>
          {date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }).split(' ')[0]}
        </CSText>
      </TimeContainer>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Container >
  )
}

export default DateSelector;
