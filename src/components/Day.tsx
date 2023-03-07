import { useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { X } from "phosphor-react";
import dayjs from "dayjs";

interface HourObject {
  initialHour?: dayjs.Dayjs;
  finalHour?: dayjs.Dayjs;
}

interface Props {
  date: Date;
  cut: number;
}
export function Day({ date, cut }: Props) {
  const dayjsDate = dayjs(date);
  const dayOfWeek = dayjsDate.format("dddd");
  const month = dayjsDate.format("MMMM");
  const day = dayjsDate.format("DD");
  const year = dayjsDate.format("YYYY");
  const [hourObject, setHourObject] = useState<HourObject>({});

  function addPadStart(value: number) {
    return String(Math.abs(Math.floor(value))).padStart(2, "0");
  }

  function formatShowHours({ hours, minutes, seconds }: { hours: number; seconds: number; minutes: number }) {
    return `${addPadStart(hours)}:${addPadStart(minutes)}:${addPadStart(seconds)}`;
  }

  const workedHours = useMemo(() => {
    const finalHoursDayJs = dayjs(hourObject.finalHour);
    const initialHoursDayJs = dayjs(hourObject.initialHour);

    const duration = dayjs.duration(finalHoursDayJs.diff(initialHoursDayJs));
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return { hours, minutes, seconds };
  }, [hourObject.finalHour]);

  const extraHours = useMemo(() => {
    const expectedFinalDate = dayjs(hourObject.initialHour).add(cut, "h");
    const finalHoursDayJs = dayjs(hourObject.finalHour);
    const duration = dayjs.duration(finalHoursDayJs.diff(expectedFinalDate));

    const durationHours = duration.hours();
    const durationMinutes = duration.minutes();
    const durationSeconds = duration.seconds();

    const hasBankHours = durationHours > 0 || durationMinutes > 0 || durationSeconds > 0;

    const hours = hasBankHours ? durationHours : 0;
    const minutes = hasBankHours ? durationMinutes : 0;
    const seconds = hasBankHours ? durationSeconds : 0;

    return { hours: durationHours, minutes: durationMinutes, seconds: durationSeconds, hasBankHours };
  }, [hourObject.finalHour]);

  function handleCheckHour() {
    const newDate = dayjs();
    if (!hourObject.initialHour) setHourObject((prevState) => ({ ...prevState, initialHour: newDate }));
    else setHourObject((prevState) => ({ ...prevState, finalHour: newDate }));
  }

  const phrase = "Não há hora marcada";

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

          {workedHours && (
            <>
              <div className="flex flex-col items-center">
                <p className="text-cyan-500 font-bold text-center">Tempo Trabalhado</p>
                <span>{formatShowHours(workedHours)}</span>
              </div>

              {extraHours && extraHours.hasBankHours ? (
                <div className="flex flex-col items-center">
                  <p className="text-cyan-500 font-bold text-center">Horas Extras</p>
                  <span className="text-lime-600">{formatShowHours(extraHours)}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-cyan-500 font-bold text-center">Horas Restantes</p>
                  <span className="text-red-500">- {formatShowHours(extraHours)}</span>
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
