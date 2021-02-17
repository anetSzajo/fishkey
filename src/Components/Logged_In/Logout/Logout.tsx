import {useAuth} from 'reactfire';
import React from "react";
import {useHistory} from "react-router-dom";


export default function Logout() {
    const auth = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        auth.signOut()
            .then(() => history.push('/'))
            .catch(err => console.log('Could not logout' + err))
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}