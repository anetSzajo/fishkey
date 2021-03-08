import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import React from "react";
import {Link} from 'react-router-dom';

export default function FlashcardsCategories() {
    const {data: user} = useUser();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)
        .orderBy("category")

    const allCategories: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery).data;
    const getUniqueCategories: string[] = [...new Set(allCategories?.map(item => item.category))]

    return (
        <div>
            <h1>My flashcards' categories: </h1>
            {getUniqueCategories?.map(category =>
                <Link to={{pathname: "/categoryPage", state: {category: category}}} key={`flashcard-${category}`}>
                    {category}
                </Link>
            )}
        </div>
    )
}