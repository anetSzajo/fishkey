import { AuthCheck } from 'reactfire';
import React from "react";
import UserCard from '../UserCard/UserCard';
import Login from "../Login";

export function ProfilePage() {
    return <AuthCheck fallback={<Login />}>{UserCard}</AuthCheck>
}