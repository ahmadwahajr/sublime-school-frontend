import Login from "./Pages/Login.jsx";
import Layout from "./Pages/Layout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import Dashboard from "./Pages/Dashboard";
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
