import '../../../main.scss';
import React from "react";

export default function Logo(){
    return(
        <div className="logo">
            <img src={'/icons/AppLogo.png'} alt="" />
            <p>© Fishkey</p>
        </div>
    )
}