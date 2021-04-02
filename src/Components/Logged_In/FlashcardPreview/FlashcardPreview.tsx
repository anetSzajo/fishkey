import React, {useState} from "react";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import '../../../main.scss';
import DeleteFlashcardButton from "../DeleteFlashcardButton/DeleteFlashcardButton";

type ComponentProps = {
    flashcardsFromCategory: FlashcardModel[]
}

export default function FlashcardsPreview(props: ComponentProps) {
    let [activeCategory, setActiveCategory] = useState(0);

    const handleDeletedFlashcard = () => {
        setActiveCategory(0);
        console.log("refreshed!");
    }


    const handleNext = () => {
        setActiveCategory(activeCategory => activeCategory + 1);
    }
    const handleBack = () => {
        setActiveCategory(activeCategory => activeCategory - 1);
    }

    return (
        <div>
            {props?.flashcardsFromCategory.length > 0 &&
            <div className="flashcard-preview__container">
                <button className="back-btn" onClick={handleBack} disabled={activeCategory === 0}>
                    <img alt="" src="/icons/backArrow.png"/>
                </button>
                <div className="flashcard-preview">
                    {props.flashcardsFromCategory[activeCategory]?.question}
                    <DeleteFlashcardButton handleDeletedFlashcard={handleDeletedFlashcard}
                                           documentPath={props.flashcardsFromCategory[activeCategory]?.documentId}/>
                </div>
                <button className="next-btn" onClick={handleNext}
                        disabled={activeCategory === props?.flashcardsFromCategory.length - 1}>
                    <img alt="" src="/icons/backArrow.png"/>
                </button>
            </div>
            }
        </div>
    )
}