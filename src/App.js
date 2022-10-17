import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Home from "./components/Home";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common["x-api-key"] = process.env.REACT_APP_API_KEY;

const App = () => <Home />;
export default App;
