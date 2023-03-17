import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const user = useSelector(state => state.loggedInUser);
  const data = user?.userInfo?.token;
  if (!data) {
    return <Navigate to="/login" replace={true} />;
  }

  // authorized so return child components
  return children;
}

export default PrivateRoute;
