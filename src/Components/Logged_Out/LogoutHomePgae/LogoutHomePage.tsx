import { Link } from 'react-router-dom';
import React from "react";

export default function LogoutHomePage(){
    return(
        <div>
            <h1>Welcome in FISHKEY app</h1>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    )
}