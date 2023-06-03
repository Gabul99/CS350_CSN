import { useState } from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import Body from "./Body";
import Header from "./Header";

interface Props {
  rootNavigation?: any;
}

const CalendarContainer = styled.View`
  width: 100%;
  hieight: 100%;
  background-color: #FFFFFF;
`

function Calendar({ rootNavigation }: Props) {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const DAY = DATE.getDate();
  const today = { year: YEAR, month: MONTH, date: DAY };

  const [month, setMonth] = useState<number>(MONTH);
  const [year, setYear] = useState<number>(YEAR);
  const [date, setDate] = useState<number>(DAY);
  const moveToNextMonth = (month: number) => {
    if (month === 12) {
      setYear((previousYear) => previousYear + 1);
      setMonth(1);
    } else {
      setMonth((previousMonth) => previousMonth + 1);
    }
  };

  const moveToPreviousMonth = (month: number) => {
    if (month === 1) {
      setYear((previousYear) => previousYear - 1);
      setMonth(12);
    } else {
      setMonth((previousMonth) => previousMonth - 1);
    }
  };

  const moveToSpecificYearAndMonth = (year: number, month: number) => {
    setYear(year);
    setMonth(month);
  };

  return (
    <CalendarContainer >
      <Header
        month={month}
        year={year}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
      />
      <Body
        month={month}
        year={year}
        today={today}
        date={date}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
        rootNavigation={rootNavigation}
      />
    </CalendarContainer>
  );
}
export default Calendar;

