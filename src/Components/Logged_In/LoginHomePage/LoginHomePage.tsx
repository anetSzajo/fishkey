import React from "react";
import UserCard from "../UserCard/UserCard";
import Logout from "../Logout/Logout";

export function LoginHomePage() {
    return (
        <div>
            <h1>Welcome in your app</h1>
            <UserCard/>
            <Logout/>
        </div>
    )
}