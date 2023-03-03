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
interface HourObject {
  initialHour?: dayjs.Dayjs;
  finalHour?: dayjs.Dayjs;
}
function Day({ date, cut }: { date: Date; cut: number }) {
  const dayjsDate = dayjs(date);
  const dayOfWeek = dayjsDate.format("dddd");
  const month = dayjsDate.format("MMMM");
  const day = dayjsDate.format("DD");
  const year = dayjsDate.format("YYYY");
  const [hourObject, setHourObject] = useState<HourObject>({});

  function addPadStart(value: number) {
    return String(Math.floor(value)).padStart(2, "0");
  }

  function formatShowHours({ hours, minutes, seconds }: { hours: number; seconds: number; minutes: number }) {
    return `${addPadStart(hours)}:${addPadStart(minutes)}:${addPadStart(seconds)}`;
  }

  const workedHours = useMemo(() => {
    const finalHoursDayJs = dayjs(hourObject.finalHour);
    const initialHoursDayJs = dayjs(hourObject.initialHour);

    if (finalHoursDayJs.isSame(initialHoursDayJs)) return 0;
    const hours = finalHoursDayJs.diff(initialHoursDayJs, "hours");
    const minutes = finalHoursDayJs.diff(initialHoursDayJs, "minutes") % 60;
    const seconds = finalHoursDayJs.diff(initialHoursDayJs, "seconds") % 60;
    return { hours, minutes, seconds };
  }, [hourObject.finalHour]);

  const extraHours = useMemo(() => {
    const newDate = dayjs(hourObject.initialHour).add(cut, "hour");
    const finalHoursDayJs = dayjs(hourObject.finalHour);
    const hours = Math.abs(newDate.diff(finalHoursDayJs, "hours"));

    const minutes = Math.abs(newDate.diff(finalHoursDayJs, "minutes") % 60);
    const seconds = Math.abs(newDate.diff(finalHoursDayJs, "seconds") % 60);

    return { hours, minutes, seconds, hasBankHours: hours > cut };
  }, [hourObject.finalHour]);

  function handleCheckHour() {
    const newDate = dayjs();

    if (!hourObject.initialHour) setHourObject((prevState) => ({ ...prevState, initialHour: newDate }));
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
        <Popover.Content className="min-w-[320px] p-5 rounded-xl bg-zinc-900  text-gray-300 flex flex-col">
          <h2 className="mr-1 capitalize text-center font-bold text-gray-200">
            {day}/{month}/{year}
          </h2>
          <p className="text-center">{dayOfWeek}</p>

          <div className="my-2 flex">
            <span className="flex-[0.3]">Entrada:</span>
            <span className="mx-auto">
              {!hourObject.initialHour ? phrase : hourObject.initialHour.format("HH:mm:ss")}
            </span>
          </div>

          <div className="my-2 flex">
            <span className="flex-[0.3]">Saída:</span>
            <p className="mx-auto">{!hourObject.finalHour ? phrase : hourObject.finalHour.format("HH:mm:ss")}</p>
          </div>

          {workedHours !== 0 && (
            <>
              <div className="flex flex-col items-center">
                <p className="text-cyan-500 font-bold text-center">Horas Trabalhadas</p>
                <span>{formatShowHours(workedHours)}</span>
              </div>

              {extraHours && (
                <div className="flex flex-col items-center">
                  <p className="text-cyan-500 font-bold text-center">Horas Extras</p>
                  <span>
                    {!extraHours.hasBankHours && "- "}
                    {formatShowHours(extraHours)}
                  </span>
                </div>
              )}
            </>
          )}

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
