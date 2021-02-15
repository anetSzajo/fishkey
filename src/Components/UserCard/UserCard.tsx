import React from "react";
import {
    useUser,
    useFirestore,
    useFirestoreDocData,
    ObservableStatus
} from 'reactfire';

export default function UserCard() {

    const { data: user } = useUser();

    const DEFAULT_USER_EMAIL: string = 'default@default.default';

    const userDetailsRef = useFirestore()
        .collection('users')
        .doc('iqzhGGKj6WkEwGjyE4fT')


    let userEmail: ObservableStatus<unknown> = useFirestoreDocData(
        userDetailsRef
    );

    userEmail = userEmail || DEFAULT_USER_EMAIL;

    return (
        <h1>User: {userEmail}</h1>
    )
}