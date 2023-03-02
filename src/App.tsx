import * as Popover from "@radix-ui/react-popover";
import { X } from "phosphor-react";
import dayjs from "dayjs";
import "dayjs/plugin/objectSupport";

import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import { useMemo, useState } from "react";
const daysOfMonth = dayjs(new Date()).daysInMonth();
function App() {
  const date = new Date();
  const hourCut = 10;
  return (
    <section>
      <h1>Daysx</h1>
      <Day date={date} cut={hourCut} />
    </section>
  );
}

export default App;

function Day({ date, cut }: { date: Date; cut: number }) {
  const dayOfWeek = dayjs(date).format("dddd");
  const month = dayjs(date).format("MMMM");
  const day = dayjs(date).format("DD");
  const year = dayjs(date).format("YYYY");
  const [hourObject, setHourObject] = useState({ initialHour: "", finalHour: "" });
  const addPadStart = (value: number) => {
    return String(value).padStart(2, "0");
  };

  const hourBank = useMemo(() => {
    const initialHourSplit = hourObject.initialHour.split(":");
    const finalHourSplit = hourObject.finalHour.split(":");
    if (finalHourSplit.length === 0 || initialHourSplit.length === 0) return 0;
    const initialHourObject = {
      hours: Number(initialHourSplit[0]),
      minute: Number(initialHourSplit[1]),
      second: Number(initialHourSplit[2]),
    };
    const finalHourObject = {
      hours: Number(finalHourSplit[0]),
      minute: Number(finalHourSplit[1]),
      second: Number(finalHourSplit[2]),
    };

    const initialHourDate = dayjs(date)
      .hour(initialHourObject.hours)
      .minute(initialHourObject.minute)
      .second(initialHourObject.second);
    const finalHourDate = dayjs(date)
      .hour(finalHourObject.hours)
      .minute(finalHourObject.minute)
      .second(finalHourObject.second);
    const hoursDiff = finalHourDate.diff(initialHourDate, "hours");
    const minutesDiff = finalHourDate.diff(initialHourDate, "minutes");
    const secondsDiff = finalHourDate.diff(initialHourDate, "seconds") % 60;
    try {
      console.log(hoursDiff, minutesDiff, secondsDiff);
      if (hoursDiff < cut) {
        throw new Error();
      }
      return `${addPadStart(hoursDiff)}:${addPadStart(minutesDiff)}:${addPadStart(secondsDiff)}`;
    } catch {
      const actualDate = dayjs().hour();

      return 0;
    }
  }, [hourObject]);

  function handleCheckHour() {
    const newDate = dayjs().format("HH:mm:ss");
    if (isEmpty(hourObject.initialHour)) setHourObject((prevState) => ({ ...prevState, initialHour: newDate }));
    else setHourObject((prevState) => ({ ...prevState, finalHour: newDate }));
  }
  const phrase = "Não há hora marcada";
  function isEmpty(value: string) {
    return value == "";
  }
  return (
    <Popover.Root>
      <Popover.Trigger className="w-7 h-7 flex items-center justify-center p-2 rounded-sm border-2 bg-purple-800 border-none text-indigo-200 font-bold">
        {day}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-4 rounded-sm bg-zinc-900  text-gray-300 flex flex-col">
          <h2 className="mr-1 capitalize text-center font-bold text-gray-200">
            {day}/{month}/{year}
          </h2>
          <p className="text-center">{dayOfWeek}</p>

          <div className="my-2 flex">
            <span className="flex-[0.3]">Entrada:</span>
            <span className="text-center flex-1">
              {isEmpty(hourObject.initialHour) ? phrase : hourObject.initialHour}
            </span>
          </div>
          <div className="my-2 flex">
            <span className="flex-[0.3]">Saída:</span>
            <p className="text-center flex-1">{isEmpty(hourObject.finalHour) ? phrase : hourObject.finalHour}</p>
          </div>
          {!Number.isNaN(hourBank) ? (
            <div className="flex flex-col items-center">
              <p className="text-cyan-500 font-bold text-center">Banco de Horas</p>
              <span>{hourBank}</span>
            </div>
          ) : null}

          <button className="py-2 px-4 mt-3 bg-purple-900 rounded text-slate-300" onClick={handleCheckHour}>
            Marcar Hora
          </button>

          <Popover.Arrow height={16} width={24} className="fill-zinc-900" />
          <Popover.Close>
            <X
              size={22}
              className="text-slate-200 absolute top-4 right-4 hover:text-slate-500 translate-y-[-50%] translate-x-[50%] transition"
            />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
