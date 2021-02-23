import React from "react";
import {useHistory} from "react-router-dom";

export default function NewFlashcardButton(){
    const history = useHistory();

    const handleButtonClicked = (event: React.MouseEvent) => {
        history.push('/addNewFlashCard');
    }

    return(
        <button onClick={handleButtonClicked}>New Flashcard</button>
    )
}