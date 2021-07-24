import { useContext } from "react";
import { Context } from "./context/Context";
import TopBar from "./Components/TopBar/TopBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import Setting from "./Pages/Setting/Setting";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";

function App() {
  const { user } = useContext(Context);

  return (
    <div className="App">
      <Router>
        <TopBar />
        <Switch>
          <Route path="/post/:id">
            <Single />
          </Route>
          <Route path="/write">{user ? <Write /> : <Register />}</Route>
          <Route path="/setting">{user ? <Setting /> : <Register />}</Route>
          <Route path="/login">{user ? <Home /> : <Login />}</Route>
          <Route path="/register">{user ? <Home /> : <Register />}</Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
