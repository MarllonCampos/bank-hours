import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Picker } from "../components/Picker";
interface Props {}
export function YearPicker() {
  const actualYear = dayjs().year();
  const arrayOfYears = Array.from({ length: 9 }, (_f, index) => (index != 4 ? actualYear + (index - 4) : actualYear));

  return <Picker data={arrayOfYears} itemToMatch={actualYear} route="content" />;
}
