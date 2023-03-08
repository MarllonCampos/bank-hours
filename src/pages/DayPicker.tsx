import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router-dom";
import { Day } from "../components/Day";
export function DayPicker() {
  const { year, month } = useParams();

  const monthIndex = dayjs.monthsShort().findIndex((monthShort) => monthShort == month) + 1;
  const formattedDate = `${year}/${monthIndex}/01`;
  const date = dayjs(formattedDate);
  const firstDateWeek = Number(date.format("d"));
  const daysInAMonth = date.daysInMonth();
  const allWeekDays = dayjs.weekdaysShort().map((weekDay) => weekDay.at(0)?.toUpperCase());
  const allDays = Array.from({ length: daysInAMonth + firstDateWeek }, (_x, index) =>
    index < firstDateWeek ? null : ++index - firstDateWeek
  );

  const cut = 10;
  return (
    <section className="w-[100%] h-[100%] bg-slate-600 flex flex-col items-center">
      <h3 className="text-zinc-300 text-center">Selecione um dia</h3>
      <div className="grid grid-cols-7 grid-flow-row-dense max-w-[400px] gap-4">
        {allWeekDays.map((weekDay, index) => (
          <span
            className="bg-gray-700 text-slate-400 text-bold flex items-center justify-center  w-7 h-7 rounded"
            key={`${weekDay}-${index}`}
          >
            {weekDay}
          </span>
        ))}
        {allDays.map((day, index) =>
          !day ? (
            <span className="bg-slate-500 w-7 h-7 rounded" key={index} />
          ) : (
            <Day date={new Date(`${year}/${monthIndex}/${day}`)} cut={cut} key={index} />
          )
        )}
      </div>
    </section>
  );
}
