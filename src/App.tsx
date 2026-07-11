import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";




function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/products" element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Register />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
