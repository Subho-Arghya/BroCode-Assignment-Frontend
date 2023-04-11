import "./App.css";
import { Route, Routes } from "react-router-dom";
import Locations from "./pages/Locations";
import Users from "./pages/Users";
import Register from "./pages/Register";
import { AppContextProvider } from "./context/AppContext";

import { Fragment } from "react";

function App() {
  return (
    <AppContextProvider>
      <Fragment>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Fragment>
    </AppContextProvider>
  );
}

export default App;
