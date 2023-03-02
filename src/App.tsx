import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
const daysOfMonth = dayjs(new Date()).daysInMonth();
function App() {
  return (
    <section>
      <h1>Daysx</h1>
      <Day />
    </section>
  );
}

export default App;

function Day() {
  return (
    <Popover.Root>
      <Popover.Trigger className="h-4 w-4 rounded-sm border-2" />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-4 rounded-lg bg-zinc-900 flex"></Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
