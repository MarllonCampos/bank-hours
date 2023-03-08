import dayjs from "dayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { YearPicker } from "./pages/YearPicker";
import { MonthPicker } from "./pages/MonthPicker";
import { DayPicker } from "./pages/DayPicker";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<YearPicker />} />
        <Route path=":year" element={<MonthPicker />} />
        <Route path=":year/:month" element={<DayPicker />} />
      </Routes>
    </BrowserRouter>
  );
}
