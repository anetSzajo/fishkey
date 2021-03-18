import {useFirestore, useFirestoreCollectionData, useUser} from "reactfire";
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";
import React, {useState} from "react";
import {Link} from 'react-router-dom';
import '../../../main.scss';
import GoBackButton from "../GoBackButton/GoBackButton";

export default function FlashcardsCategories() {

    let [activeCategory, setActiveCategory] = useState(0);
    const {data: user} = useUser();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)
        .orderBy("category")

    const allCategories: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery).data;
    const getUniqueCategories: string[] = [...new Set(allCategories?.map(item => item.category))]

    const handleNext = () => {
        setActiveCategory(activeCategory => activeCategory + 1);
    }
    const handleBack = () => {
        setActiveCategory(activeCategory => activeCategory - 1);
    }

    return (
        <div className="flashcardsCategoriesPage">
            <h1>Flashcards' Categories</h1>
            <div className="category-btn__container">
                {/*{getUniqueCategories?.map(category =>*/}
                {/*    <Link className="category-btn" to={{pathname: "/categoryPage", state: {category: category}}} key={`flashcard-${category}`}>*/}
                {/*        <h2 className="category-btn__name">{category}</h2>*/}
                {/*    </Link>*/}
                {/*)}*/}
                {getUniqueCategories?.length
                    ?
                    <Link className="category-btn" to={{pathname: "/categoryPage", state: {category: getUniqueCategories[activeCategory]}}} key={`flashcard-${getUniqueCategories[activeCategory]}`}>
                        <h2 className="category-btn__name">{getUniqueCategories[activeCategory]}</h2>
                        <p className="cards" ><img alt="" src="/icons/cards.png"/>X</p>
                    </Link>
                    :
                    null
                }
                <button className="back-btn" onClick={handleBack} disabled={activeCategory === 0}>
                    <img alt="" src="/icons/backArrow.png" />
                </button>
                <button className="next-btn" onClick={handleNext} disabled={activeCategory === getUniqueCategories.length -1}>
                    <img alt="" src="/icons/backArrow.png" />
                </button>
            </div>
            <GoBackButton/>
        </div>
    )
}