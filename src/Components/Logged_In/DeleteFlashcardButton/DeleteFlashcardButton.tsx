import React from "react";
import firebase from "firebase/app";

type ComponentProps = {
    documentPath: string
}

export default function DeleteFlashcardButton(props: ComponentProps) {

    const db = firebase.firestore();


    const handleDeleteFlashcard = (event: React.MouseEvent) => {
        db.collection("Flashes")
            .doc(`${props.documentPath}`)
            .delete()
            .then(() => {
                console.log("Flashcard successfully deleted!");
            })
            .catch((error) => {
                    console.error("Error removing flashcard: ", error);
                }
            );
    }

    return (
        <button onClick={handleDeleteFlashcard}>Delete</button>
    )
}