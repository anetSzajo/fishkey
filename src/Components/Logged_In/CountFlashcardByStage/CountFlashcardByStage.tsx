import React from 'react';
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import '../../../main.scss';
import Box from "../Box/Box";

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
                <Box count={countFlashcardByStage.firstBox} boxClass={'box-first'}/>
                <Box count={countFlashcardByStage.secondBox} boxClass={'box-second'}/>
                <Box count={countFlashcardByStage.thirdBox} boxClass={'box-third'}/>
                <Box count={countFlashcardByStage.fourthBox} boxClass={'box-fourth'}/>
                <Box count={countFlashcardByStage.fifthBox} boxClass={'box-fifth'}/>
                {/*<Box count={countFlashcardByStage.archivedBox} boxClass={'box-archived'}/>*/}


                {/*<p>Stage 1: {countFlashcardByStage.firstBox} flashcards</p>*/}
                {/*<p>Stage 2: {countFlashcardByStage.secondBox} flashcards</p>*/}
                {/*<p>Stage 3: {countFlashcardByStage.thirdBox} flashcards</p>*/}
                {/*<p>Stage 4: {countFlashcardByStage.fourthBox} flashcards</p>*/}
                {/*<p>Stage 5: {countFlashcardByStage.fifthBox} flashcards</p>*/}
                {/*<p>Archived: {countFlashcardByStage.archivedBox} flashcards</p>*/}
            </div>
            :
            null
    )
}