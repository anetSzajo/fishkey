import React from "react";
import {useFirestore, useFirestoreCollectionData, useUser} from 'reactfire';

export default function UserCard() {

    const {data: user} = useUser();
    const allFlashesQuery = useFirestore()
        .collection('Flashes')
        .where("uid", "==", user.uid)

    const flashes = useFirestoreCollectionData<{question: string, answer: string}>(allFlashesQuery);

    return (
        <div>
            <h1>User: {user.uid}</h1>
            <h1>wyemitowal {flashes.data?.map(n => n.question)}</h1>
            {JSON.stringify(flashes.data)}
        </div>
    )
}