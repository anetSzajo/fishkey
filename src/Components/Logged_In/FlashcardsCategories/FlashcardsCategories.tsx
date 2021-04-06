import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {createFromFirestore, FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import React, {useState} from "react";
import {Link} from 'react-router-dom';
import NewFlashcardButton from "../NewFlashcardButton/NewFlashcardButton";
import '../../../main.scss';

export default function FlashcardsCategories() {

    let [activeCategory, setActiveCategory] = useState(0);
    const {data: user} = useUser();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)
        .orderBy("category")

    const allCategories: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery).data?.map(el => createFromFirestore(el));
    const getUniqueCategories: string[] = [...new Set(allCategories?.map(item => item.category))]

    const handleNext = () => {
        setActiveCategory(activeCategory => activeCategory + 1);
    }
    const handleBack = () => {
        setActiveCategory(activeCategory => activeCategory - 1);
    }

    return (
        <div className="flashcardsCategoriesPage">
            <div className="categoriesPage__background">
                <h1>Flashcards' Categories</h1>
                <NewFlashcardButton />
            </div>
            <div className="category-btn__container">
                <button className="previous-btn" onClick={handleBack} disabled={activeCategory === 0}>
                    <img alt="" src="/icons/backArrow.png" />
                </button>
                {getUniqueCategories?.length
                    ?
                    <Link className="category-btn" to={{pathname: "/categoryPage", state: {category: getUniqueCategories[activeCategory]}}} key={`flashcard-${getUniqueCategories[activeCategory]}`}>
                        <h2 className="category-btn__name">{getUniqueCategories[activeCategory]}</h2>
                    </Link>
                    :
                    null
                }
                <button className="next-btn" onClick={handleNext} disabled={activeCategory === getUniqueCategories.length -1}>
                    <img alt="" src="/icons/backArrow.png" />
                </button>
            </div>
        </div>
    )
}