import {useAuth} from 'reactfire';
import React from "react";
import {useHistory} from "react-router-dom";
import '../../../main.scss';

export default function Logout() {
    const auth = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        auth.signOut()
            .then(() => history.push('/'))
            .catch(err => console.log('Could not logout' + err))
    }

    return (
        <button className="nav-btn logout-btn" onClick={handleLogout}>Logout</button>
    )
}