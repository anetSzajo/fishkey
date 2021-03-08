import React from 'react';
import 'firebase/auth';
import Login from "./Components/Logged_Out/Login";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Register from "./Components/Logged_Out/Register/Register";
import {LoginHomePage} from "./Components/Logged_In/LoginHomePage/LoginHomePage";
import LogoutHomePage from "./Components/Logged_Out/LogoutHomePgae/LogoutHomePage";
import {AuthCheck} from "reactfire";
import NewFlashcard from "./Components/Logged_In/NewFlashcard/NewFlashcard";
import FlashcardsDashboard from "./Components/Logged_In/FlashcardsDashboard/FlashcardsDashboard";
import EndTraining from "./Components/Logged_In/EndTraining/EndTraining";
import FlashcardsCategories from "./Components/Logged_In/FlashcardsCategories/FlashcardsCategories";
import CategoryFlashcardsPage from "./Components/Logged_In/CategoryFlashcardsPage/CategoryFlashcardsPage";

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
                            <FlashcardsCategories />
                        </AuthCheck>
                    </Route>
                    <Route exact path='/categoryPage'>
                        <AuthCheck fallback={<Redirect to='/'/>}>
                           <CategoryFlashcardsPage />
                        </AuthCheck>
                    </Route>
                    <Route exact path='/dashboard'>
                        <AuthCheck fallback={<Redirect to='/'/>}>
                            <FlashcardsDashboard/>
                            <EndTraining />
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
