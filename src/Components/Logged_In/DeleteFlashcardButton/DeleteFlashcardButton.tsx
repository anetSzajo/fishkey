import React from "react";
import firebase from "firebase/app";
import '../../../main.scss';

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
        <button className="flashcard-delete-btn" onClick={handleDeleteFlashcard}>Delete</button>
    )
}