import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";




function App() {

  return (
    <div className="min-h-screen flex items-center justify-items-center bg-base-200">
      <button className="btn btn-primary">
        Probanding
      </button>
    </div>
  );
}

export default App
