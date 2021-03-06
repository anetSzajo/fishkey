import React from "react";
import StartTraining from "../StartTraining/StartTraining";
import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {createFromFirestore, FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import FlashcardsPreview from "../FlashcardPreview/FlashcardPreview";
import {useLocation} from "react-router";
import GoBackButton from "../GoBackButton/GoBackButton";
import CountFlashcardByStage from "../CountFlashcardByStage/CountFlashcardByStage";
import '../../../main.scss';
import Logout from "../Logout/Logout";

export default function CategoryFlashcardsPage(){

    const {data: user} = useUser();
    const location = useLocation<{category: string}>();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)
        .where("category", "==", location.state.category)

    const allFlashcardsByCategory: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery).data?.map(el => createFromFirestore(el));

    return (
        <div>
            {location.state.category && allFlashcardsByCategory
                ?
                <div className="flashcardsCategoryPage">
                    <div className="categoryPage__background">
                        <h1>Category: {location.state.category}</h1>
                        <StartTraining trainingCategory={location.state.category} disabled={allFlashcardsByCategory.length === 0}/>
                    </div>
                    <div className="categoryPage__background__bottom">
                        <h2>Flashcards in {location.state.category}</h2>
                        <p className="cards-big"><img alt="" src="/icons/cards.png"/>{allFlashcardsByCategory.length}</p>
                        <FlashcardsPreview flashcardsFromCategory={allFlashcardsByCategory}/>
                        <h3>Flashcards in boxes</h3>
                        <CountFlashcardByStage flashcards={allFlashcardsByCategory} />
                    </div>
                    <GoBackButton />
                    <Logout />
                </div>
                :
                null
            }
        </div>
    )
}