import {AuthCheck, ReactFireOptions, useAuth, useObservable} from 'reactfire';
import React from "react";
import Login from "../../Logged_Out/Login";
import UserCard from "../UserCard/UserCard";

export function LoginHomePage() {
    return (
        <div>
            <AuthCheck fallback={<Login/>}>
                <h1>Welcome in your app</h1>
                <UserCard/>
            </AuthCheck>
        </div>
    )
}