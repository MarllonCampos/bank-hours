import dayjs from "dayjs";
import React from "react";
import { Picker } from "../components/Picker";
import { useParams } from "react-router-dom";
export function MonthPicker() {
  const { year } = useParams();
  const route = `${year}/content`;

  const months = dayjs.monthsShort();
  const actualMonth = dayjs().format("MMM");
  const arrayOfMonths = Array.from({ length: months.length }, (_f, index) => dayjs().month(index).format("MMM"));

  return <Picker data={arrayOfMonths} itemToMatch={actualMonth} route={route} />;
}
