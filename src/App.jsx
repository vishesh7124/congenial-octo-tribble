import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Schedule } from "./pages/Schedule";
import { Events } from "./pages/Events";
import { Competitions } from "./pages/Competitions";
import { Sponsors } from "./pages/Sponsors";
import { ContactUs } from "./pages/ContactUs";
import { Team } from "./pages/TeamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/events" element={<Events />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/team" element= {<Team />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
