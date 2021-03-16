import { Link } from 'react-router-dom';
import React from "react";
import Logo from "../Logo/Logo";
import '../../../main.scss';

export default function LogoutHomePage(){
    return(
        <div className="logoutPage">
            <Logo />
            <button className="button login-btn"><Link to='/login'>LOGIN</Link></button>
            <button className="button register-btn"><Link to='/register'>REGISTER</Link></button>
        </div>
    )
}