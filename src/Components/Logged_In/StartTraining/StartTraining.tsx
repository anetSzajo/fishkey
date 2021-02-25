import React from "react";
import {useHistory} from 'react-router-dom'

export default function StartTraining(){
    const history = useHistory();

    const handleStartTrainingButtonClick = (event: React.MouseEvent) => {
        history.push('/dashboard');
    }

    return(
        <button onClick={handleStartTrainingButtonClick}>START TRAINING</button>
    )
}