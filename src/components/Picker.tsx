import { Link } from "react-router-dom";

interface PickerProps {
  data: Array<string | number>;
  itemToMatch: string | number;
  route: string;
}
export function Picker({ data, itemToMatch, route }: PickerProps) {
  function hasDataItem() {
    const index = data.findIndex((dataItem) => dataItem == itemToMatch);
    return index;
  }

  function parseRoute(content: string | number) {
    const formattedContent = content.toString();
    return route.replace(/content/gi, formattedContent);
  }

  const pickStyle =
    hasDataItem() !== -1
      ? "ring-2 ring-rose-200 min-[460px]:ring-gray-300 min-[460px]:hover:ring-rose-200 min-[460px]:hover:scale-105 "
      : "";

  const cn = (index: number) =>
    `rounded bg-purple-800 text-gray-50 font-bold px-[0.25rem] py-1 text-center ${
      hasDataItem() === index ? pickStyle : ""
    } hover:bg-purple-500 transition `;

  return (
    <div className="h-[100%] flex items-start justify-center py-8">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 ">
        {data.map((content, index) => {
          console.log(parseRoute(content));
          return (
            <Link className={cn(index)} to={`/${parseRoute(content)}`} key={`${content}-${index}`}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
