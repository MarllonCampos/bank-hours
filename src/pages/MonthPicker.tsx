import dayjs from "dayjs";
import React from "react";
import { Picker } from "../components/Picker";

export function MonthPicker() {
  console.log("monthpicker");

  const months = dayjs.monthsShort();
  const actualMonth = dayjs().format("MMM");
  const arrayOfMonths = Array.from({ length: months.length }, (_f, index) => dayjs().month(index).format("MMM"));

  return <Picker data={arrayOfMonths} itemToMatch={actualMonth} />;
}
