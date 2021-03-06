import React from 'react';
import 'firebase/auth';
import Login from "./Components/Logged_Out/Login";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Register from "./Components/Logged_Out/Register/Register";
import {LoginHomePage} from "./Components/Logged_In/LoginHomePage/LoginHomePage";
import LogoutHomePage from "./Components/Logged_Out/LogoutHomePgae/LogoutHomePage";
import {AuthCheck} from "reactfire";
import NewFlashcard from "./Components/Logged_In/NewFlashcard/NewFlashcard";
import Training from "./Components/Logged_In/Training/Training";
import CategoryFlashcardsPage from "./Components/Logged_In/CategoryFlashcardsPage/CategoryFlashcardsPage";
import Logout from "./Components/Logged_In/Logout/Logout";
import Footer from "./Components/Footer/Footer";

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
                    <Route exact path='/home'>
                        <AuthCheck fallback={<Redirect to='/'/>}>
                            <LoginHomePage/>
                        </AuthCheck>
                    </Route>
                    <Route exact path='/categoryPage'>
                        <AuthCheck fallback={<Redirect to='/'/>}>
                           <CategoryFlashcardsPage />
                        </AuthCheck>
                    </Route>
                    <Route exact path='/training'>
                        <AuthCheck fallback={<Redirect to='/'/>}>
                            <Training/>
                        </AuthCheck>
                        <Logout />
                    </Route>
                    <Route exact path='/addNewFlashCard'>
                        <AuthCheck fallback={<Redirect to='/'/>}>
                            <NewFlashcard/>
                        </AuthCheck>
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
