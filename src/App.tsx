import React from 'react';
import 'firebase/auth';
import Login from "./Components/Login";
import { BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Register from "./Components/Register/Register";

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
