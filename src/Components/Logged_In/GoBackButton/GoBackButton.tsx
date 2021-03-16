import React from "react";
import {useHistory} from "react-router-dom";

export default function GoBackButton() {

    const history = useHistory();

    const handleGoingBack = () => {
        history.goBack()
    }

    return (
        <button className=" nav-btn goBack-btn" onClick={handleGoingBack}>Go Back</button>
    )
}