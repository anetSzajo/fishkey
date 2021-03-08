import React from "react";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";

type ComponentProps = {
    flashcardsFromCategory: FlashcardModel[]
}

export default function FlashcardsPreview(props: ComponentProps) {
    return <div>
        {props?.flashcardsFromCategory.map(flashcard => <p key={`flashcard-${flashcard.question}`}>{flashcard.question}</p>)}
    </div>
}