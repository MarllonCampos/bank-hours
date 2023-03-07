import dayjs from "dayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultCalendarPicker } from "./components/DefaultPicker";
import { YearPicker } from "./pages/YearPicker";
import { MonthPicker } from "./pages/MonthPicker";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<YearPicker />} />
        <Route path="/:year" element={<MonthPicker />}>
          <Route path="/:year/:month" element={<h2>Ola?</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
