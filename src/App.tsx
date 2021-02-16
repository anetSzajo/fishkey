import React from 'react';
import 'firebase/auth';
import Login from "./Components/Logged_Out/Login";
import { BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Register from "./Components/Logged_Out/Register/Register";
import {LoginHomePage} from "./Components/Logged_In/LoginHomePage/LoginHomePage";
import LogoutHomePage from "./Components/Logged_Out/LogoutHomePgae/LogoutHomePage";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/">
                    <LogoutHomePage />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path='/dashboard'>
                    <LoginHomePage />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
