import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
 
const [isAuthenticated, setIsAuthenticated] = useState(false);

 // Your authentication logic goes here...
 
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;