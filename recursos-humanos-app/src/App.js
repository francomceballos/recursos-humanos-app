import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListEmployees from "./employees/ListEmployees";
import Navigation from "./template/Navigation";
import AddEmployee from "./employees/AddEmployee";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navigation/>
        <Routes>
        <Route exact path="/" element={<ListEmployees />} />
        <Route exact path="/add" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}
export default App;
