import React from 'react';
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";

type ComponentProps = {
    flashcards : FlashcardModel[]
}

export default function FilterFlashcardsByStage(props: ComponentProps ) {

    let flashcardsFiltered = false;
    const firstBox = [];
    const secondBox = [];
    const thirdBox = [];
    const fourthBox = [];
    const fifthBox = [];
    const archivedBox = [];

    const filterFlashcardsByStage = (flashcards: FlashcardModel[]) => {

        if (flashcards === []){
            return <div>All boxes are empty</div>
        } else {
            flashcards.map((n) => {
                if (n.stage === "archived") {
                    archivedBox.push(n)
                } else if (n.stage === 1) {
                    firstBox.push(n)
                } else if (n.stage === 2) {
                    secondBox.push(n)
                } else if (n.stage === 3) {
                    thirdBox.push(n)
                } else if (n.stage === 4) {
                    fourthBox.push(n)
                } else if (n.stage === 5) {
                    fifthBox.push(n)
                }
                flashcardsFiltered = true;
                }
            )
        }
    }

    return (
        <div>
            {filterFlashcardsByStage(props.flashcards)}
            {flashcardsFiltered ?
            <div>
                <p>Stage 1: {firstBox.length} flashcards</p>
                <p>Stage 2: {secondBox.length} flashcards</p>
                <p>Stage 3: {thirdBox.length} flashcards</p>
                <p>Stage 4: {fourthBox.length} flashcards</p>
                <p>Stage 5: {fifthBox.length} flashcards</p>
                <p>Archived: {archivedBox.length} flashcards</p>
            </div>
                :
                null
            }
        </div>
    )
}