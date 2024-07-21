import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import AuctionDetails from "./components/auction-details";
import Profile from "./components/profile";
import Private from "./components/private";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Private Component={Home} />} />
        <Route path="/home" element={<Private Component={Home} />} />
        <Route path="/dashboard" element={<Private Component={Dashboard} />} />
        <Route
          path="/auction-details/:_id"
          element={<Private Component={AuctionDetails} />}
        />
        <Route path="/profile" element={<Private Component={Profile} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
