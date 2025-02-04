import {useAuth} from "./Context";
import Home from "./Home";
import Login from "./Login";

const App = () => {
  const { user } = useAuth();
  return user ? <Home /> : <Login />;
};
export default App;