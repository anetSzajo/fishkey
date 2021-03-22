import React, {useState} from "react";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import '../../../main.scss';

type ComponentProps = {
    flashcardsFromCategory: FlashcardModel[]
}

export default function FlashcardsPreview(props: ComponentProps) {
    let [activeCategory, setActiveCategory] = useState(0);

    const handleNext = () => {
        setActiveCategory(activeCategory => activeCategory + 1);
    }
    const handleBack = () => {
        setActiveCategory(activeCategory => activeCategory - 1);
    }

    return <div className="flashcard-preview__container">
        {props?.flashcardsFromCategory.length
            ?
            <p className="flashcard-preview" key={`flashcard-${props.flashcardsFromCategory[activeCategory].question}`}>{props.flashcardsFromCategory[activeCategory].question}</p>
            :
            null
        }
        <button className="back-btn" onClick={handleBack} disabled={activeCategory === 0}>
            <img alt="" src="/icons/backArrow.png" />
        </button>
        <button className="next-btn" onClick={handleNext} disabled={activeCategory === props?.flashcardsFromCategory.length -1}>
            <img alt="" src="/icons/backArrow.png" />
        </button>
    </div>
}