import React from 'react';
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import '../../../main.scss';

type ComponentProps = {
    flashcards: FlashcardModel[]
}

type Accumulator = {
    firstBox: number,
    secondBox: number,
    thirdBox: number,
    fourthBox: number,
    fifthBox: number,
    archivedBox: number,
}

export default function CountFlashcardByStage(props: ComponentProps) {

    const countFlashcardByStage = props.flashcards.reduce(function (accumulator: Accumulator, currentValue: FlashcardModel): Accumulator {
        if (currentValue.stage === 1) {
            return {...accumulator, firstBox: accumulator.firstBox + 1}
        } else if (currentValue.stage === 2) {
            return {...accumulator, secondBox: accumulator.secondBox + 1}
        } else if (currentValue.stage === 3) {
            return {...accumulator, thirdBox: accumulator.thirdBox + 1}
        } else if (currentValue.stage === 4) {
            return {...accumulator, fourthBox: accumulator.fourthBox + 1}
        } else if (currentValue.stage === 5) {
            return {...accumulator, fifthBox: accumulator.fifthBox + 1}
        } else if (currentValue.stage === 'archived') {
            return {...accumulator, archivedBox: accumulator.archivedBox + 1}
        }
        return accumulator;
    }, {
        firstBox: 0,
        secondBox: 0,
        thirdBox: 0,
        fourthBox: 0,
        fifthBox: 0,
        archivedBox: 0,
    });

    return (
        {countFlashcardByStage}
            ?
            <div className="boxes__container">
                <p className="counter">{countFlashcardByStage.firstBox}</p>
                <p className="counter">{countFlashcardByStage.secondBox}</p>
                <p className="counter">{countFlashcardByStage.thirdBox}</p>
                <p className="counter">{countFlashcardByStage.fourthBox}</p>
                <p className="counter">{countFlashcardByStage.fourthBox}</p>
                <p>I</p>
                <p>II</p>
                <p>III</p>
                <p>IV</p>
                <p>V</p>
            </div>
            :
            null
    )
}