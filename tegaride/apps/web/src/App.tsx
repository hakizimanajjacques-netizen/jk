import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import ComingSoonPage from "./pages/public/ComingSoonPage";
import HomePage from "./pages/public/HomePage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        {/* These become real pages in later steps */}
        <Route path="book" element={<ComingSoonPage />} />
        <Route path="drivers/join" element={<ComingSoonPage />} />
        <Route path="business" element={<ComingSoonPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Route>
    </Routes>
  );
}
