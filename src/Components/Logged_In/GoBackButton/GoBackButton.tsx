import React from "react";
import {useHistory} from "react-router-dom";

export default function GoBackButton() {

    const history = useHistory();

    const handleGoingBack = () => {
        history.goBack()
    }

    return (
        <button onClick={handleGoingBack}>GO BACK</button>
    )
}