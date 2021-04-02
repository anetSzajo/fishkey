import React, {useState} from "react";
import {Redirect} from 'react-router-dom'

export default function StartTraining(props: { trainingCategory: string, disabled: boolean }){

    const [buttonPressed, setButtonPressed] = useState(false);

    if (buttonPressed) {
        return <Redirect push to={{pathname: '/training', state: { trainingCategory: props.trainingCategory}}} />
    }
    else {
        return (
            <button className="button-small start-btn" onClick={() => setButtonPressed(true)} disabled={props.disabled}>START TRAINING</button>
        )
    }
}