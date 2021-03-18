import React from "react";
import NewFlashcardButton from "../NewFlashcardButton/NewFlashcardButton";
import StartTraining from "../StartTraining/StartTraining";
import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import FlashcardsPreview from "../FlashcardPreview/FlashcardPreview";
import {useLocation} from "react-router";
import GoBackButton from "../GoBackButton/GoBackButton";
import CountFlashcardByStage from "../CountFlashcardByStage/CountFlashcardByStage";


export default function CategoryFlashcardsPage(){

    const {data: user} = useUser();
    const location = useLocation<{category: string}>();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)
        .where("category", "==", location.state.category)

    const allFlashcardsByCategory: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery).data;

    return (
        <div>
            {location.state.category && allFlashcardsByCategory
                ?
                <div className="flashcardsCategoryPage">
                    <GoBackButton />
                    <h1>Category: {location.state.category}</h1>
                    <div className="category-menu-buttons__container">
                        <StartTraining trainingCategory={location.state.category}/>
                        <NewFlashcardButton/>
                    </div>
                    <p className="cards-big"><img alt="" src="/icons/cards.png"/>{allFlashcardsByCategory.length}</p>
                    <FlashcardsPreview flashcardsFromCategory={allFlashcardsByCategory}/>
                    <CountFlashcardByStage flashcards={allFlashcardsByCategory} />
                </div>
                :
                null
            }
        </div>
    )
}