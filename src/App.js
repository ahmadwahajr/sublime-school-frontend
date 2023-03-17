import "./App.css";
import Login from "./Pages/Login.js";
import Layout from "./Pages/Layout.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Layout Children={Students} />
              </PrivateRoute>
            }
          />
          {/* <Route
            exact
            path="/students"
            element={
              <PrivateRoute>
                <Layout Children={Students} />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
