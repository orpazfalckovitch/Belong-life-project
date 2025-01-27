import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountriesList from "./components/CountriesList/CountriesList";
import SelectedCountry from "./components/SelectedCountry/SelectedCountry";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/country/:country" element={<SelectedCountry />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
