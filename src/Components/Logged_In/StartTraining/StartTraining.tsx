import React, {useState} from "react";
import {Redirect} from 'react-router-dom'

export default function StartTraining(props: { trainingCategory: string }){

    const [buttonPressed, setButtonPressed] = useState(false);

    if (buttonPressed) {
        return <Redirect push to={{pathname: '/dashboard', state: { trainingCategory: props.trainingCategory}}} />
    }
    else {
        return (
            <button className="button-small start-btn" onClick={() => setButtonPressed(true)}>START TRAINING</button>
        )
    }
}