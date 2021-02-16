import {useAuth} from 'reactfire';
import React from "react";
import {useHistory} from "react-router-dom";


export default function Logout() {
    const auth = useAuth();
    const history = useHistory();

    const handleLogout = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log('Logout button clicked!')
        auth.signOut()
                .then(r =>  console.log('Logged Out!'))
                .catch(err => console.log('Could not logout' + err))
        history.push('/');
        console.log('Logged Out and history changed!')
    }

    return(
        <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleLogout(event)}>Logout</button>
    )
}