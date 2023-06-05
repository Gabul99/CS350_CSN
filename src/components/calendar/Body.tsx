import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { v4 as uuidv4 } from "uuid";
import divideArray from "../../utils/divideArray";
import isSameObj from "../../utils/isSameObj";
import CSText, { FontType } from "../core/CSText";
import styled from "styled-components/native";
import Schedule, { ISchedule } from "./Schedule";

interface Props {
  year: number;
  month: number;
  date: number;
  today: { year: number; month: number };
  moveToNextMonth: (month: number) => void;
  moveToPreviousMonth: (month: number) => void;
  moveToSpecificYearAndMonth: (year: number, month: number) => void;
  rootNavigation: any;
}

interface State {
  prev: DayState;
  curr: DayState;
  next: DayState;
}

interface DayState {
  daysList: [];
  year: number;
  month: number;
}

const BodyContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
`;

const BodyHeader = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
`;

const BodyContent = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`
const TotalDays = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 60%;
`;

const BoxHead = styled.View`
  width: 14.2%;
  justify-content: center;
  align-items: center;
`;

const BoxDate = styled.View`
  width: 14.2%;
  height: 22%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0;
  gap: 5px;
  border-top-width: 1px;
  border-top-color: #E0EBED;
`;

const ScheduleContainer = styled.View`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function Body({
  year, month, date, today, moveToNextMonth, moveToPreviousMonth, rootNavigation
}: Props) {
  const [totalDays, setTotalDays] = useState([]);
  const [totalDaysByState, setTotalDaysByState] = useState<DayState | Object>({});
  const [week, setWeek] = useState(0);
  const [viewTotalDays, setViewTotalDays] = useState(true);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);

  useEffect(() => {
    getTotalDays();
  }, [year, month, date]);

  useEffect(() => {
    totalDays.forEach((el, idx) => {
      if (el.includes(date)) {
        setWeek(idx);
      }
    });
  }, [totalDays]);

  useEffect(() => {
    // const getSchedule = async () => {
    //   const res = await fetch("http://localhost:3000/schedules");
    //   const data = await res.json();
    //   setSchedules(data);
    // };
    getTotalSchedules();
  }, []);

  const getTotalDays = () => {
    const previousMonthLastDate = new Date(year, month - 1, 0).getDate();
    const previousMonthLastDay = new Date(year, month - 1, 0).getDay();
    const currentMonthLastDate = new Date(year, month, 0).getDate();
    const currentMonthLastDay = new Date(year, month, 0).getDay();

    const previousDays = Array.from(
      { length: previousMonthLastDay + 1 },
      (v, i) => previousMonthLastDate - previousMonthLastDay + i
    );
    const currentDays = Array.from(
      { length: currentMonthLastDate },
      (v, i) => i + 1
    );
    const nextDays = Array.from(
      { length: 6 - currentMonthLastDay },
      (v, i) => i + 1
    );

    setTotalDays(
      divideArray([...previousDays, ...currentDays, ...nextDays], 7)
    );

    setTotalDaysByState({
      prev: {
        daysList: previousMonthLastDay !== 6 ? previousDays : [],
        year: month === 1 ? year - 1 : year,
        month: month === 1 ? 12 : month - 1,
      },
      curr: { daysList: currentDays, year: year, month: month },
      next: {
        daysList: nextDays,
        year: month === 12 ? year + 1 : year,
        month: month === 12 ? 1 : month + 1,
      },
    });
  };

  const getTotalSchedules = () => {
    // TODO API Call
    // getTotalSchedules
    const totalSchedules = [
      {
        clubId: "123saf",
        authorId: "123123",
        name: "스터디",
        startDttm: new Date(2023, 6, 1, 10, 0),
        endDttm: new Date(2023, 7, 2, 12, 0),
        isPublic: true,
      },
      {
        clubId: "123saf", authorId: "123123",
        name: "Test",
        startDttm: new Date(2023, 6, 3, 10, 0),
        endDttm: new Date(2023, 6, 3, 12, 0),
        isPublic: false,
      }
    ]
    setSchedules(totalSchedules);
  }

  const getScheduleOfDay = (year: number, month: number, day: number) => {
    if (schedules.length === 0) return [];
    const scheduleOfDay = schedules.filter((schedule) => {
      const fullDateStart = new Date(year, month, day, 0, 0);
      const fullDateEnd = new Date(year, month, day, 23, 59);
      // console.log(
      //   schedule.startDttm.toDateString(),
      //   fullDate.toDateString()
      // )
      if (schedule.startDttm.getTime() <= fullDateEnd.getTime() && fullDateStart.getTime() <= schedule.endDttm.getTime()) {
        return schedule;
      }
    })
    return scheduleOfDay;
  }

  return (
    <BodyContainer>
      <BodyHeader >
        {dayOfWeek.map((day, idx) => (
          <BoxHead key={idx}>
            <CSText fontSize={14} fontType={FontType.MEDIUM} color={changeColorByDay(day)}>{day}</CSText>
          </BoxHead>
        ))}
      </BodyHeader>
      <BodyContent>
        <TotalDays>
          {Object.keys(totalDaysByState).map((state: State) =>
            totalDaysByState[state].daysList.map((day: number) => {
              return (
                <BoxDate key={uuidv4()}>
                  <CSText
                    fontSize={14} fontType={FontType.REGULAR} color={state === "prev" || state === "next"
                      ? "gray"
                      : "black"
                    }
                  >
                    {day}
                  </CSText>
                  <ScheduleContainer>
                    {
                      getScheduleOfDay(year, month, day).map((v): ISchedule => {
                        if (state === 'curr')
                          return <Schedule key={uuidv4()} schedule={v} rootNavigation={rootNavigation} />;
                      })
                    }
                  </ScheduleContainer>
                </BoxDate>
              );
            })
          )}
        </TotalDays>
      </BodyContent>
    </BodyContainer>
  );
}

export default Body;
const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const changeColorByDay = (day: string) => {
  if (day === "SUN") {
    return 'red';
  } else if (day === "SAT") {
    return 'blue';
  } else {
    return '#2D4D52';
  }
}
