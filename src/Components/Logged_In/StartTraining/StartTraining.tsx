import React from "react";
import {Redirect} from 'react-router-dom'

type Props = {
    trainingCategory: string
}

export default function StartTraining(props: Props){

    const handleStartTrainingButtonClick = (event: React.MouseEvent) => {
        return <Redirect to={{pathname: '/dashboard', state: { trainingCategory: props.trainingCategory}}} />
    }

    return(
        <button onClick={handleStartTrainingButtonClick}>START TRAINING</button>
    )
}