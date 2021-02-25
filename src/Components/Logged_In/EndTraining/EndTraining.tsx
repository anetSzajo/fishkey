import React from "react";
import {useHistory} from 'react-router-dom';
import firebase from "firebase/app";
import {useUser} from "reactfire";


export default function EndTraining() {
    const history = useHistory();
    const {data: user} = useUser();

    // const allFlashesQuery = useFirestore()
    //     .collection('Flashes')
    //     .where("uid", "==", user.uid)

    // const flashcards: FlashcardModel[] = useFirestoreCollectionData<FlashcardModel>(allFlashesQuery).data;

    const updateFlashcardsActiveStatus = async () => {


        try {
            firebase.firestore().collection('Flashes')
                .where("uid", "==", user.uid)
                .where('stage', '!=', 'archived')
                .where('isActive', '==', false)
                .get()
                .then(response => {
                    let batch = firebase.firestore().batch()
                    response.docs.forEach((doc) => {
                        const docRef = firebase.firestore().collection('Flashes').doc(doc.id)
                        batch.update(docRef, {isActive: true})
                    })
                    batch.commit().then(() => {
                        console.log(`updated all documents inside ${'Flashes'}`)
                    })
                })
        } catch (error) {
            console.log(error);
        }
    }


    const handleEndTrainingButtonClick = (event: React.MouseEvent) => {
        updateFlashcardsActiveStatus()
            .then(() => console.log("Active status successfully updated"))
            .catch(err => console.log("Can't update active status" + err))
        history.push('/startTraining');
    }

    return (
        <button onClick={handleEndTrainingButtonClick}>END TRAINING</button>
    )
}