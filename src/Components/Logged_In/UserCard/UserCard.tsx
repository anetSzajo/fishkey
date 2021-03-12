import React from "react";
import {useUser} from 'reactfire';

export default function UserCard() {

    const {data: user} = useUser();

    return (
        <div>
            <h1>Logged as: {user.email}</h1>
        </div>
    )
}