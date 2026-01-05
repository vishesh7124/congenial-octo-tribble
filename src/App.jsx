import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SpaceBackgroundLayout } from "./layouts/SpaceBackgroundLayout";

import { Home } from "./pages/Home";
import { Schedule } from "./pages/Schedule";
import { Events } from "./pages/Events";
import { Competitions } from "./pages/AboutUs";
import { Sponsors } from "./pages/Sponsors";
import { ContactUs } from "./pages/ContactUs";
import { Team } from "./pages/TeamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route element={<SpaceBackgroundLayout />}>
          <Route path="/events" element={<Events />} />
        </Route>
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/team" element= {<Team />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
