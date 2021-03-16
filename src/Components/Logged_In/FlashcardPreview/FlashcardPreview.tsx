import React from "react";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import '../../../main.scss';

type ComponentProps = {
    flashcardsFromCategory: FlashcardModel[]
}

export default function FlashcardsPreview(props: ComponentProps) {
    return <div className="flashcard-preview__container">
        {props?.flashcardsFromCategory.map(flashcard => <p className="flashcard-preview" key={`flashcard-${flashcard.question}`}>{flashcard.question}</p>)}
    </div>
}