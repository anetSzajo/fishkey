import {AuthCheck, ReactFireOptions, useAuth, useObservable} from 'reactfire';
import React from "react";
import UserCard from "../UserCard/UserCard";
import Logout from "../Logout/Logout";
import LogoutHomePage from "../../Logged_Out/LogoutHomePgae/LogoutHomePage";

export function LoginHomePage() {
    return (
        <div>
            <AuthCheck fallback={<LogoutHomePage/>}>
                <h1>Welcome in your app</h1>
                <UserCard/>
                <Logout />
            </AuthCheck>
        </div>
    )
}