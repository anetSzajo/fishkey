import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import React from "react";
import {Link} from 'react-router-dom';
import '../../../main.scss';
import GoBackButton from "../GoBackButton/GoBackButton";

export default function FlashcardsCategories() {
    const {data: user} = useUser();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)
        .orderBy("category")

    const allCategories: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery).data;
    const getUniqueCategories: string[] = [...new Set(allCategories?.map(item => item.category))]

    return (
        <div className="flashcardsCategoriesPage">
            <h1>Flashcards' Categories</h1>
            <div className="category-btn__container">
                {getUniqueCategories?.map(category =>
                    <Link className="category-btn" to={{pathname: "/categoryPage", state: {category: category}}} key={`flashcard-${category}`}>
                        {category}
                    </Link>
                )}
            </div>
            <GoBackButton/>
        </div>
    )
}