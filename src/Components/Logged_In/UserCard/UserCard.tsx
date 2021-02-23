import React from "react";
import {useFirestore, useFirestoreCollectionData, useUser} from 'reactfire';
import {FlashcardModel} from "../../../Model/Flashcard/FlashcardModel";

export default function UserCard() {

    const {data: user} = useUser();

    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)

    // const flashes = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery);

    return (
        <div>
            <h1>User: {user.uid}</h1>
            {/*<h1>wyemitowal {flashes.data?.map(n => n.question)}</h1>*/}
            {/*{JSON.stringify(flashes.data)}*/}
        </div>
    )
}