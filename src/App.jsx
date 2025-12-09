// App.js
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoverPage from "./pages/CoverPage";
import AllGoals from "./pages/AllGoals";
import CompletedPage from "./pages/CompletedPage";
import NewGoal from "./pages/NewGoal";
import OngoingPage from "./pages/OngoingPage";
import ProgressPage from "./pages/ProgressPage";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/allgoals" element={<AllGoals />} />
        <Route path="/complete" element={<CompletedPage />} />
        <Route path="/newgoal" element={<NewGoal />} />
        <Route path="/ongoing" element={<OngoingPage />} />
        <Route path="/progress/:id" element={<ProgressPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//https://goal-backend-ip4r.onrender.com
