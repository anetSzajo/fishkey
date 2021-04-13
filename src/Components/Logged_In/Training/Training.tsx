import React from "react";
import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {createFromFirestore, FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import Flashcard from "../Flashcard/Flashcard";
import {useLocation} from "react-router";
import EndTraining from "../EndTraining/EndTraining";
import '../../../main.scss';

export default function Training() {

    const {data: user} = useUser();
    const location = useLocation<{ trainingCategory: string }>();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)
        .where("isActive", "==", true)
        .where("category", "==", location.state.trainingCategory)

    const firstStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 1)).data?.map(el => createFromFirestore(el)) || [];
    const secondStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 2)).data?.map(el => createFromFirestore(el)) || [];
    const thirdStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 3)).data?.map(el => createFromFirestore(el)) || [];
    const fourthStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 4)).data?.map(el => createFromFirestore(el)) || [];
    const fifthStageFlashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery.where("stage", "==", 5)).data?.map(el => createFromFirestore(el)) || [];

    const allFlashcards: FlashcardModel[] = [
        ...firstStageFlashcards,
        ...secondStageFlashcards,
        ...thirdStageFlashcards,
        ...fourthStageFlashcards,
        ...fifthStageFlashcards
    ]

    return (
        <div className="trainingPage">
            {allFlashcards?.length ?
                <Flashcard {...allFlashcards[0]} />
                :
                <p className="notification">Good job! Everything trained</p>
            }
            <EndTraining/>
        </div>
    )
}