import React from 'react';
import 'firebase/auth';
import Login from "./Components/Logged_Out/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect
} from 'react-router-dom';
import Register from "./Components/Logged_Out/Register/Register";
import {LoginHomePage} from "./Components/Logged_In/LoginHomePage/LoginHomePage";
import LogoutHomePage from "./Components/Logged_Out/LogoutHomePgae/LogoutHomePage";
import {AuthCheck} from "reactfire";
import NewFlashcard from "./Components/Logged_In/NewFlashcard/NewFlashcard";
import NewFlashcardButton from "./Components/Logged_In/NewFlashcardButton/NewFlashcardButton";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LogoutHomePage/>
                    </Route>
                    <Route exact path="/register">
                        <Register/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path='/dashboard'>
                        <AuthCheck fallback={<Redirect to='/'/>}>
                            <LoginHomePage/>
                            <NewFlashcardButton />
                        </AuthCheck>
                    </Route>
                    <Route exact path='/addNewFlashCard'>
                        <AuthCheck fallback={<Redirect to='/'/>}>
                            <NewFlashcard/>
                        </AuthCheck>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
